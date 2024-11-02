/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const bcrypt = require('bcryptjs');

const throwError = require('../utilities/throwError');
const model = require('../models/queries');
const db = require('../models/users');
const mailTransporter = require('../utilities/mailTransporter');

const otpService = {};

otpService.generateOtp = async (obj) => {
    const alreadyConfirmed = await db.users.findOne({ email: obj.email });

    if (!alreadyConfirmed) {
        throwError('Email is not registered.Please Signup', 400);
    }

    if (alreadyConfirmed.isUserConfirmed && obj.action === 'register') {
        throwError('Email is already Confirmed Proceed to Login', 400);
    }

    if (!alreadyConfirmed.isUserConfirmed && obj.action !== 'register' && obj.action !== 'verifyemail') {
        throwError('Email is not confirmed.Please Confirm the email', 400);
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mail = {
        from: `E-Commerce🛒 <${process.env.FROM_EMAIL}>`,
        to: obj.email,
        subject: `Verify your mail for ${obj.action} attempt`,
        html: `Hi use this otp ${otp} for ${obj.action} attempt`,
    };

    const hash = await bcrypt.hash(otp, 10);

    obj.otp = hash;
    const result = await model.postOtp(obj);

    if (result) {
        await mailTransporter.sendMail(mail);
        return result;
    } else {
        throwError('OTP Generation Failed Due To Internal Server Error Try Again', 500);
    }
};

otpService.verifyOtp = async (obj, ip) => {
    const result = await model.getOtp(obj.id);

    if (!result) {
        throwError('No OTP Found please generate otp again', 400);
    }

    const value = await bcrypt.compare(obj.otp, result.otp);

    if (!value) {
        await otpService.sendActions(result.email, 'Invalid OTP', `${result.action} attempt failed for <strong>${result.email}</strong> at ${new Date()} using IP address ${ip}`);
        throwError('OTP is invalid', 400);
    }

    if (result.action === 'verifyemail') {
        const alreadyConfirmed = await db.users.findOne({ email: result.email, isUserConfirmed: true });

        if (alreadyConfirmed) {
            throwError('Email Already Verified. Proceed to login', 400);
        }
        const updateIsConfirmed = await db.users.updateOne({ email: result.email }, { $set: { isUserConfirmed: true } });

        if (!updateIsConfirmed) {
            throwError('Verification Faild Due To Internal Server Error.Please try again', 500);
        }

        await db.otp.deleteOne({ _id: result._id });
        await otpService.sendActions(result.email, 'Email verification success', `Mail verification success for <strong>${result.email}</strong> at ${new Date()} using IP address ${ip}`);

        return 'Email Verified Successfully';
    }

    if (result.action === 'register') {
        const alreadyConfirmed = await db.users.findOne({ email: result.email, isUserConfirmed: true });

        if (alreadyConfirmed) {
            throwError('Email Already Verified. Proceed to login', 400);
        }
        const updateIsConfirmed = await db.users.updateOne({ email: result.email }, { $set: { isUserConfirmed: true } });

        if (!updateIsConfirmed) {
            throwError('Registration Faild Due To Internal Server Error.Please try again', 500);
        }

        await db.otp.deleteOne({ _id: result._id });
        await otpService.sendActions(result.email, 'Registation success', `Mail verification success for <strong>${result.email}</strong> at ${new Date()} using IP address ${ip}`);

        return 'Registered Successfully';
    } else if (result.action === 'login') {
        await db.otp.deleteOne({ _id: result._id });
        await otpService.sendActions(result.email, 'Logged in successfull', `Login attempt success for <strong>${result.email}</strong> at ${new Date()} using IP address ${ip}`);

        return 'Login Success';
    } else if (result.action === 'forgotPassword') {
        const hash = await bcrypt.hash(obj.password, 10);

        obj.password = hash;
        obj.email = result.email;

        const updated = await model.updatePassword(obj);

        if (!updated) {
            throwError('Password updation failed due to internal server error', 500);
        }

        await db.otp.deleteOne({ _id: result._id });
        await otpService.sendActions(result.email, 'Reset Password Success', `Password change success for <strong>${result.email}</strong> at ${new Date()} using IP address ${ip}`);

        return 'Password changed Successfully';
    } else {
        throwError('Invalid action to perform', 400);
    }
};

otpService.sendActions = async (email, subject, htmlContent) => {
    try {
        const mail = {
            from: `E-Commerce🛒 <${process.env.FROM_EMAIL}>`,
            to: email,
            subject,
            html: htmlContent,
        };
        await mailTransporter.sendMail(mail);
    } catch (err) {
        throwError('Sending action to email failed due to internal server error', 500);
    }
};

module.exports = otpService;
