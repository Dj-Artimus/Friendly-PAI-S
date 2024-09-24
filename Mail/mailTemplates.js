
export const emailVerificationTemplate = (name, token, OTP) => {
    const verificationLink = `${process.env.CLIENT_URL}/verify-user/${token}/${OTP}`;
    return `<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
        a {
            color: #365cce;
            text-decoration: none;
        }
        .otpbox {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            padding: 5px;
            letter-spacing: 4px;
            font-size: 30px;
            font-weight: bold;
            color: #365cce
        }

        .footertext {
            font-size: 12px;
        }

        @media (min-width: 640px) {
            .footertext {
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div
    style="display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: Nunito, sans-serif;border: 1px solid rgb(127, 127, 127); border-radius: 9px;margin-bottom: 15px;">
    <section style="max-width: 42rem; background-color: #ffffff; padding: 10px; border-radius: 10px;">
        <header>
            <a href="#">
                <h1 style="text-align: center; font-family: monospace; font-weight: 900;font-size: 20px;">Your Friendly
                    Companion PAI</h1>
            </a>
        </header>
        <div
            style="background-color: #0040ff86; width: 100%; color: #fff;border-radius: 20px;">
            <div style="text-align: center;padding-top: 5px;">
                <div style="width: 2.5rem; height: 5px; background-color: #ffffff;display: inline-block;margin-bottom: 6px;"></div><h1 style="display: inline-block;margin:4px 3px 5px 7px;">📧</h1>
                <div style="width: 2.5rem; height: 5px; background-color: #ffffff; display: inline-block; margin-bottom: 6px;"></div>
            </div>
            <div>
                <div
                    style="text-align: center; font-size: 12px;margin: 7px 0; font-weight: normal;letter-spacing: 1px;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
                    THANKS FOR SIGNING UP!
                </div>
                <div
                    style="font-size: 18px; font-weight: bold; text-transform: capitalize; text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding-bottom: 15px;">
                    Verify your E-mail Address
                </div>
            </div>
        </div>
        <main
            style="margin-top: 2rem; padding-left: 1.25rem; padding-right: 1.25rem;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <h2 style="color: #374151;">Hello ${name},</h2>
            <p style="line-height: 1.5; color: #4b5563;">
                Please use the following One Time Password(OTP)
            </p>
            <div style="display: flex; align-items: center;justify-content: center; margin-top: 1rem; gap: 20px;">
                <p class="border otpbox">
                    ${OTP}
                </p>
            </div>
            <p style="margin-top: 1rem; line-height: 1.75; color: #4b5563;">
                This passcode will only be valid for the next
                <span style="font-weight: bold;"> 10 minutes</span>.
            </p>
            <p style="margin-top: 2rem; color: #4b5563; ">
                Thank you, <br />
                <strong>Your Friendly Companion <br>PAI (Personalized Artificial Intelligence)</strong>
            </p>
        </main>
        <p style="color: #7b8794; padding-left: 1.25rem; padding-right: 1.25rem; margin-top: 2rem;text-align: center;">
            This email was sent from
            <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #365cce; text-decoration : none;"
                target="_blank">
                YourFriendlyCompanion.PAI@hotmail.com
            </a><br>
            This email is only for verification purpose if it belongs to you.<br> Otherwise you can safely ignore it.
        </p>
        <footer style="margin-top: 2rem;">
            <div
                style="background-color: rgba(209, 213, 219, 0.6);padding: 10px;">
                <div style="text-align: center;">
                    <h1
                        style="color: #365cce; font-weight: bolder;  font-size: 20px; letter-spacing : 2px; font-family:Georgia, 'Times New Roman', Times, serif;">
                        Get in touch
                    </h1>
                    <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #4b5563;display: block;margin-bottom: 15px;" >
                        YourFriendlyCompanion.PAI@hotmail.com
                    </a>
                </div>
            </div>
            <div
                style="background-color: #0039e3a0; padding-top :10px; padding-bottom : 10px; color: #fff; text-align: center; border-radius: 0 0 8px 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p class="footertext">© 2024 Friendly PAI All Rights Reserved. <br>Developed by DjArtimus ❤</p>
            </div>
        </footer>
    </section>
    </div>
</body>

</html>`
}

export const welcomeEmailTemplate = (name) => {
    const PAILink = `${process.env.SERVER}:${process.env.PORT}`;
    return `<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
        a {
            color: #365cce;
            text-decoration: none;
        }

        .otpbox {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            padding: 5px;
            letter-spacing: 4px;
            font-size: 30px;
            font-weight: bold;
            color: #365cce
        }

        .footertext {
            font-size: 12px;
        }

        @media (min-width: 640px) {
            .footertext {
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div
        style="display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: Nunito, sans-serif;border: 1px solid rgb(127, 127, 127); border-radius: 9px;margin-bottom: 15px;">
        <section style="max-width: 42rem; background-color: #ffffff; padding: 10px; border-radius: 10px;">
            <header>
                <a href="#">
                    <h1 style="text-align: center; font-family: monospace; font-weight: 900;font-size: 20px;">Your
                        Friendly
                        Companion PAI</h1>
                </a>
            </header>
            <div style="background-color: #0040ff86; width: 100%; color: #fff;border-radius: 20px;">
                <div style="text-align: center;padding-top: 5px;">
                    <div
                        style="width: 2.5rem; height: 5px; background-color: #ffffff;display: inline-block;margin-bottom: 6px;">
                    </div>
                    <h1 style="display: inline-block;margin:4px 3px 5px 7px;">❤</h1>
                    <div
                        style="width: 2.5rem; height: 5px; background-color: #ffffff; display: inline-block; margin-bottom: 6px;">
                    </div>
                </div>
                <div>
                    <div
                        style="font-size: 18px; font-weight: bold; text-transform: capitalize; text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding-bottom: 15px;">
                        THANKS FOR SIGNING UP!
                    </div>
                </div>
            </div>
            <main
                style="margin-top: 2rem; padding-left: 1.25rem; padding-right: 1.25rem;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <h2 style="color: #374151;">Hello ${name},</h2>
                <p style="line-height: 1.5; color: #4b5563;">

                    We’re thrilled to have you here! 🎊 <br><br>
                    Welcome to Friendly PAI 🌟, an innovative platform where your personalized AI chatbot is ready to
                    assist you with any questions you might have. Whether you’re looking for quick answers, detailed
                    explanations, or just a friendly chat, Friendly PAI is here to help. 💬✨<br><br>

                    As a valued member of our community, you’ll be the first to know about exciting updates 🚀, new
                    features 🆕, and much more. If you ever need assistance or have any questions about using Friendly
                    PAI, don’t hesitate to reach out to our support team. We’re always here to help you in any way we
                    can. 🤝💡<br><br>

                    Thank you for joining us, and we look forward to making your experience with Friendly PAI
                    exceptional! 🌈

                </p>
                
                <a href="${PAILink}" style="display: flex; justify-content: center;">
                    <button
                        style="padding-left: 1.25rem; padding-right: 1.25rem; padding-top: 0.5rem; padding-bottom: 0.5rem; margin-top: 1rem; font-size: 14px; font-weight: bold; text-transform: capitalize; background-color: #f97316; color: #fff; transition-property: background-color; transition-duration: 300ms; transform: none; border-radius: 0.375rem; border-width: 1px; border: none; outline: none; cursor: pointer;">
                        Visit Your Friendly PAI
                    </button>
                </a>
                <p style="margin-top: 2rem; color: #4b5563; ">
                    Best regards,, <br />
                    <strong>Your Friendly Companion <br>PAI (Personalized Artificial Intelligence)</strong>
                </p>
            </main>
            <p
                style="color: #7b8794; padding-left: 1.25rem; padding-right: 1.25rem; margin-top: 2rem;text-align: center;">
                This email was sent from
                <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #365cce; text-decoration : none;"
                    target="_blank">
                    YourFriendlyCompanion.PAI@hotmail.com
                </a><br>
                <strong>Please Note:</strong> This email is to welcome you and provide a brief introduction to Friendly PAI. 📧 For any questions or support, please contact our team directly. Do not reply to this email. 🚫
            </p>
            <footer style="margin-top: 2rem;">
                <div style="background-color: rgba(209, 213, 219, 0.6);padding: 10px;">
                    <div style="text-align: center;">
                        <h1
                            style="color: #365cce; font-weight: bolder;  font-size: 20px; letter-spacing : 2px; font-family:Georgia, 'Times New Roman', Times, serif;">
                            Get in touch
                        </h1>
                        <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com"
                            style="color: #4b5563;display: block;margin-bottom: 15px;">
                            YourFriendlyCompanion.PAI@hotmail.com
                        </a>
                    </div>
                </div>
                <div
                    style="background-color: #0039e3a0; padding-top :10px; padding-bottom : 10px; color: #fff; text-align: center; border-radius: 0 0 8px 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <p class="footertext">© 2024 Friendly PAI All Rights Reserved. <br>Developed by DjArtimus ❤</p>
                </div>
            </footer>
        </section>
    </div>
</body>

</html>`
}

export const forgotPasswordEmailTemplate = (name, token) => {
    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log(resetPasswordLink)
    return `<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
        a {
            color: #365cce;
            text-decoration: none;
        }
        .otpbox {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            padding: 5px;
            letter-spacing: 4px;
            font-size: 30px;
            font-weight: bold;
            color: #365cce
        }

        .footertext {
            font-size: 12px;
        }

        @media (min-width: 640px) {
            .footertext {
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div
    style="display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: Nunito, sans-serif;border: 1px solid rgb(127, 127, 127); border-radius: 9px;margin-bottom: 15px;">
    <section style="max-width: 42rem; background-color: #ffffff; padding: 10px; border-radius: 10px;">
        <header>
            <a href="#">
                <h1 style="text-align: center; font-family: monospace; font-weight: 900;font-size: 20px;">Your Friendly
                    Companion PAI</h1>
            </a>
        </header>
        <div
            style="background-color: #0040ff86; width: 100%; color: #fff;border-radius: 20px;">
            <div style="text-align: center;padding-top: 5px;">
                <div style="width: 2.5rem; height: 5px; background-color: #ffffff;display: inline-block;margin-bottom: 6px;"></div><h1 style="display: inline-block;margin:4px 3px 5px 7px;">🔐👀</h1>
                <div style="width: 2.5rem; height: 5px; background-color: #ffffff; display: inline-block; margin-bottom: 6px;"></div>
            </div>
            <div>
                
                <div
                    style="font-size: 18px; font-weight: bold; text-transform: capitalize; text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding-bottom: 15px;">
                    Forgot Your Password ?
                </div>
                <div
                    style="text-align: center; font-size: 12px;margin: 0px 0;padding-bottom: 15px; font-weight: normal;letter-spacing: 1px;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
                    IT HAPPENS TO THE BEST OF US!
                </div>
            </div>
        </div>
        <main
            style="margin-top: 2rem; padding-left: 1.25rem; padding-right: 1.25rem;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <h2 style="color: #374151;">Hello ${name},</h2>
            <p style="line-height: 1.5; color: #4b5563;">
                We have received your request to change your Password.
                Please use below button to <br> <strong>Reset Password</strong>
            </p>
            <a href="${resetPasswordLink}" style="display: flex; justify-content: center;">
                <button
                    style="padding-left: 1.25rem; padding-right: 1.25rem; padding-top: 0.5rem; padding-bottom: 0.5rem; margin: 10px; font-size: 14px; font-weight: bold; text-transform: capitalize; background-color: #f97316; color: #fff; transition-property: background-color; transition-duration: 300ms; transform: none; border-radius: 0.375rem; border-width: 1px; border: none; outline: none; cursor: pointer;">
                    RESET PASSWORD
                </button>
            </a>
            <p style="margin-top: 1rem; line-height: 1.75; color: #4b5563;">
                This password reset link will only be valid for the next
                <span style="font-weight: bold;"> 10 minutes.</span>
            </p>
            
            <p style="margin-top: 2rem; color: #4b5563; ">
                Thank you, <br />
                <strong>Your Friendly Companion <br>PAI (Personalized Artificial Intelligence)</strong>
            </p>
        </main>
        <p style="color: #7b8794; padding-left: 1.25rem; padding-right: 1.25rem; margin-top: 2rem;text-align: center;">
            This email was sent from
            <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #365cce; text-decoration : none;"
                target="_blank">
                YourFriendlyCompanion.PAI@hotmail.com
            </a><br>
            <strong>Please Note : </strong>
            If you do not want to change the password or didnt request to reset the password. You can safely ignore and delete this email.
        </p>
        <footer style="margin-top: 2rem;">
            <div
                style="background-color: rgba(209, 213, 219, 0.6);padding: 10px;">
                <div style="text-align: center;">
                    <h1
                        style="color: #365cce; font-weight: bolder;  font-size: 20px; letter-spacing : 2px; font-family:Georgia, 'Times New Roman', Times, serif;">
                        Get in touch
                    </h1>
                    <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #4b5563;display: block;margin-bottom: 15px;" >
                        YourFriendlyCompanion.PAI@hotmail.com
                    </a>
                </div>
            </div>
            <div
                style="background-color: #0039e3a0; padding-top :10px; padding-bottom : 10px; color: #fff; text-align: center; border-radius: 0 0 8px 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p class="footertext">© 2024 Friendly PAI All Rights Reserved. <br>Developed by DjArtimus ❤</p>
            </div>
        </footer>
    </section>
    </div>
</body>

</html>`
}

export const resetPasswordSuccessEmailTemplate = (name) => {
    return `<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
        a {
            color: #365cce;
            text-decoration: none;
        }

        .otpbox {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            padding: 5px;
            letter-spacing: 4px;
            font-size: 30px;
            font-weight: bold;
            color: #365cce
        }

        .footertext {
            font-size: 12px;
        }

        @media (min-width: 640px) {
            .footertext {
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div
        style="display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: Nunito, sans-serif;border: 1px solid rgb(127, 127, 127); border-radius: 9px;margin-bottom: 15px;">
        <section style="max-width: 42rem; background-color: #ffffff; padding: 10px; border-radius: 10px;">
            <header>
                <a href="#">
                    <h1 style="text-align: center; font-family: monospace; font-weight: 900;font-size: 20px;">Your
                        Friendly
                        Companion PAI</h1>
                </a>
            </header>
            <div style="background-color: #0040ff86; width: 100%; color: #fff;border-radius: 20px;">
                <div style="text-align: center;padding-top: 5px;">
                    <div
                        style="width: 2.5rem; height: 5px; background-color: #ffffff;display: inline-block;margin-bottom: 6px;">
                    </div>
                    <h1 style="display: inline-block;margin:4px 3px 5px 7px;">🎉</h1>
                    <div
                        style="width: 2.5rem; height: 5px; background-color: #ffffff; display: inline-block; margin-bottom: 6px;">
                    </div>
                </div>
                <div>

                    <div
                        style="font-size: 18px; font-weight: bold; text-transform: capitalize; text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding-bottom: 15px;">
                        Password Reset Successfully
                    </div>
                    <div
                        style="text-align: center; font-size: 12px;margin: 0px 0;padding-bottom: 15px; font-weight: normal;line-height: 17px; letter-spacing: 1px;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
                        Your account is now secure <br> with your new password.
                    </div>
                </div>
            </div>
            <main
                style="margin-top: 2rem; padding-left: 1.25rem; padding-right: 1.25rem;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <h2 style="color: #374151;">Hello ${name},</h2>
                <p style="line-height: 1.5; color: #4b5563;">
                    We wanted to let you know that your password has been successfully reset. If you did not make this
                    change or if you have any concerns about your account’s security, please contact our support team
                    immediately. We’re here to help! 🛡️<br><br>

                    Thank you for taking steps to keep your account secure. 🔒
                </p>

                <p style="margin-top: 2rem; color: #4b5563; ">
                    Best regards, <br />
                    <strong>Your Friendly Companion <br>PAI (Personalized Artificial Intelligence)</strong>
                </p>
            </main>
            <p
                style="color: #7b8794; padding-left: 1.25rem; padding-right: 1.25rem; margin-top: 2rem;text-align: center;">
                This email was sent from
                <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com" style="color: #365cce; text-decoration : none;"
                    target="_blank">
                    YourFriendlyCompanion.PAI@hotmail.com
                </a><br>
                <strong>Please Note : </strong>
                This email is to confirm your password reset. For any questions or support, please contact our team directly. Do not reply to this email. 🚫
            </p>
            <footer style="margin-top: 2rem;">
                <div style="background-color: rgba(209, 213, 219, 0.6);padding: 10px;">
                    <div style="text-align: center;">
                        <h1
                            style="color: #365cce; font-weight: bolder;  font-size: 20px; letter-spacing : 2px; font-family:Georgia, 'Times New Roman', Times, serif;">
                            Get in touch
                        </h1>
                        <a href="mailto:YourFriendlyCompanion.PAI@hotmail.com"
                            style="color: #4b5563;display: block;margin-bottom: 15px;">
                            YourFriendlyCompanion.PAI@hotmail.com
                        </a>
                    </div>
                </div>
                <div
                    style="background-color: #0039e3a0; padding-top :10px; padding-bottom : 10px; color: #fff; text-align: center; border-radius: 0 0 8px 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <p class="footertext">© 2024 Friendly PAI All Rights Reserved. <br>Developed by DjArtimus ❤</p>
                </div>
            </footer>
        </section>
    </div>
</body>

</html>`
}