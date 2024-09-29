import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuth = async (req, res, next) => {
    // Attempt to retrieve token from cookies
    let token = req.cookies.token;

    // If not found in cookies, check the Authorization header
    if (!token) {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            const parts = authHeader.split(" ");
            if (parts.length === 2 && parts[0] === 'Bearer') {
                token = parts[1]; // Get the token part
            }
        }
    }
    // If no token is found, return an error response
    if (!token) {
        return res.status(403).json({ success: false, message: "Session expired, please login." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user; // Extract the user ID from the decoded token

        if (!userId) {
            return res.status(403).json({ success: false, message: "Unexpected error retrieving the user, please login." });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).json({ success: false, message: "User not found." });
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        return res.status(403).json({ success: false, message: "Invalid token." });
    }
};
