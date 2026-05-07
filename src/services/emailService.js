import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default async function sendEmail(mail) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
    });
    // console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return {success:true, message: "Message is sent"};
}

// sendEmail({ to: "test1@user.com", subject: "test subject", text: "text ENV" });
