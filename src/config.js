const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Explicitly specify Gmail's SMTP host
  port: 587, // Use 587 for TLS
  secure: false, // Use false for TLS (not SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotification = async (email, bookTitle, dueDate, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Verify SMTP connection when initializing Nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying SMTP server:', error);
  } else {
    console.log('Server is ready to take messages');
  }
});

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  sendNotification,
};
