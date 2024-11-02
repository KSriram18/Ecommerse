const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD,
    },
});

module.exports = mailTransporter;
