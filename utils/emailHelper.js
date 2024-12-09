// /backend/utils/emailHelper.js
const nodemailer = require('nodemailer');

// Set up the transporter with your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other email services as well
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,  // Your email password or App password
    },
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
