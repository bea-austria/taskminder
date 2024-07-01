const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendPWResetEmail(email, token){
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: `Password Reset`,
        html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password?token=${token}">http://localhost:5173/reset-password?token=${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            return true;
        }
    });
}
module.exports = sendPWResetEmail;