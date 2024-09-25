import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, htmlTemplate) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        }
    });


    const receiver = {
        from: `"Friendly PAI" <${process.env.MAIL_ID}>`,
        to: email,
        subject: subject,
        html: htmlTemplate
    }

    await transporter.sendMail(receiver, (error, res) => {
        if (error) return console.log(error);
        return res.accepted
    })

}

export default sendEmail;