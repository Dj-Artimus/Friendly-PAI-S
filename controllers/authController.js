import bcryptjs from "bcryptjs";
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import { sendResetPasswordEmail, sendResetPasswordSuccessEmail, sendUserVerificationEmail, sendWelcomeEmail } from "../Mail/mailer.js";


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields are mandotory" });

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ success: false, message: "User already registered with this email." })

        const hashedPassword = await bcryptjs.hash(password, 10);
        const userVerificationOTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;


        const user = await new User({
            name,
            email,
            password: hashedPassword,
            userVerificationOTP,
            userVerificationOTPExpiresAt: Date.now() + 1000 * 60 * 10  // 10 mins

        })

        const userVerificationToken = generateTokenAndSetCookie(res, user._id);

        await sendUserVerificationEmail(name, email, userVerificationToken, userVerificationOTP);

        res.status(201).json({ success: true, message: "User registered successfully.", token: userVerificationToken });
        await user.save()

    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to create your account. Server Error!" })
        console.log(error);
    }

};

const verifyUser = async (res, token, OTP) => {
    try {

        if (!token) return res.status(403).json({ success: false, message: "Verification token not found, Unauthorized Request!" });
        if (!OTP) return res.status(403).json({ success: false, message: "OTP is required. Please enter the 6-digit OTP to proceed" });

        const userId = jwt.verify(token, process.env.JWT_SECRET).user;

        if (!userId) return res.status(404).json({ success: false, message: "Invalid token, Please Sign Up again." });

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found, Please Sign Up." });

        const isVerificationOTPExpired = Date.now() >= user.userVerificationOTPExpiresAt;

        if (isVerificationOTPExpired) return res.status(408).json({ success: false, message: "Verification OTP is Expired.", isVerificationOTPExpired: true });

        const isVerificationOTPVerified = OTP === user.userVerificationOTP;

        if (!isVerificationOTPVerified) return res.status(401).json({ success: false, message: "OTP did not matched, Please enter OTP correctly." });


        user.userVerificationToken = undefined;
        user.userVerificationOTP = undefined;
        user.userVerificationOTPExpiresAt = undefined;
        user.isVerified = true;

        await sendWelcomeEmail(user.name, user.email);

        res.status(202).json({ success: true, message: "Verification Done Successfully." });
        await user.save();


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const verifyEmailViaOtp = (req, res) => {
    try {
        const token = req.cookies["token"];
        const OTP = req.body.otp;

        verifyUser(res, token, OTP);

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

}

export const verifyEmailViaLink = (req, res) => {
    try {
        const token = req.params.token;
        const OTP = req.params.otp;

        verifyUser(res, token, OTP)

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

};

export const resendOTP = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(400).json({ success: false, message: "Invalid token. Unauthorised request! Please Sign Up again" })

        const userId = jwt.verify(token, process.env.JWT_SECRET).user;

        if (!userId) return res.status(404).json({ success: false, message: "Invalid token, Please Sign Up again." });

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found, Please Sign Up again." });

        user.userVerificationOTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        user.userVerificationOTPExpiresAt = Date.now() + 1000 * 60 * 10 // 10 Mins


        const sendMail = await sendUserVerificationEmail(user.name, user.email, token, user.userVerificationOTP);

        // if (!sendMail) return res.status(401).json({ success: false, message: "Unable to send OTP . Please try again ." })

        res.status(201).json({ success: true, message: `OTP sent successfully, to ${user.email} email address . ` })
        await user.save();

    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to send OTP . Please try again .", error: error })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(406).json({ success: false, message: "All fields are mandotory" });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ success: false, message: "User not found, Please create your account." });

        const userId = user._id;

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) return res.status(401).json({ success: false, message: "Password didn't match , Please try again." });

        const token = generateTokenAndSetCookie(res, userId);

        res.status(202).json({ success: true, message: "Successfully loged in." , token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",  // Set to "none" if your site requires cross-site access
            secure: process.env.NODE_ENV === "production",  // Set to true if your site requires HTTPS
        })
        return res.status(200).json({ success: true, message: "Logout Successful" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ success: false, message: "User not found, Please create your account." });

        const resetPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = Date.now() + 1000 * 60 * 10; // 10 mins;


        const sendMail = sendResetPasswordEmail(user.name, email, resetPasswordToken);

        // if (!sendMail) return res.status(401).json({ success: false, message: "Unable to send reset password link . Please try again ." })

        res.status(202).json({ success: true, message: `Reset password link sent to your email id (${email}).` });
        await user.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { password } = req.body;

        if (!password) return res.status(401).json({ success: false, message: "Password not Provided. Please try again." });

        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) return res.status(401).json({ success: false, message: "Reset link is expired. Please try again." });

        const tokenVerification = token === user.resetPasswordToken;
        const isResetPasswordTokenExpired = Date.now() >= user.resetPasswordTokenExpiresAt;

        if (isResetPasswordTokenExpired) res.status(401).json({ success: false, message: "Reset link is expired. Please try again." })

        if (!tokenVerification) res.status(401).json({
            success: false, message: "Invalid Token, Unauthorized Request."
        })

        const hashedPassword = await bcryptjs.hash(password, 10);

        const sendMail = sendResetPasswordSuccessEmail(user.name, user.email);
        // if (!sendMail) return res.status(401).json({ success: false, message: "Unable to send Password Reset Confiramation Mail ." })

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;



        res.status(201).json({ success: true, message: "Password Reset Successfull." });
        user.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const authorizationCheck = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.json({ isVerified: false, isAuthorized: false })
        return res.json({ isVerified: user.isVerified, isAuthorized: true });
    } catch (error) {
        res.status(400).json({ success: false, message: "User Not Authorized" })
    }
}