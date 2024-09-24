import sendEmail from "./mailerConfig.js";
import { emailVerificationTemplate, forgotPasswordEmailTemplate, resetPasswordSuccessEmailTemplate, welcomeEmailTemplate } from "./mailTemplates.js";


export const sendUserVerificationEmail = async (name, email, token, OTP) => {
    const subject = "Verify Your Email Address."
    const html = emailVerificationTemplate(name, token, OTP);
    const response = await sendEmail(email,subject,html)
    return response;
}

export const sendWelcomeEmail = async (name,email) => {
    const subject = "Your Friendly PAI ✨ Welcomes You!"
    const html = welcomeEmailTemplate(name);
    const response = await sendEmail(email,subject,html)
    return response;
}

export const sendResetPasswordEmail = async (name, email, token) => {
    const subject = "Reset Your Password 🔑"
    const html = forgotPasswordEmailTemplate(name, token);
    const response = await sendEmail(email,subject,html)
    return response;
}

export const sendResetPasswordSuccessEmail = async (name,email) => {
    const subject = "Your Password Has Been Successfully Reset 🎉🔐"
    const html = resetPasswordSuccessEmailTemplate(name);
    const response = await sendEmail(email,subject,html)
    return response;
}
