const bcrypt = require('bcryptjs');

const throwError = require('../utilities/throwError');
const model = require('../models/queries');
const db = require('../models/users');
const otpService = require('./otp');

const userService = {};

userService.register = async (userObj) => {
    const result = await db.users.findOne({ email: userObj.email });
    if (!result) {
        const hash = await bcrypt.hash(userObj.password, 10);

        userObj.password = hash;
        const created = await model.register(userObj);
        if (created) {
            return created;
        } else {
            throwError('Registration Failed', 500);
        }
    } else {
        throwError('Email is already registered proceed to login', 400);
    }
};

userService.login = async (userObj) => {
    const confirmed = await db.users.findOne({ email: userObj.email });

    if (!confirmed) {
        throwError('Email is not registered. please register', 404);
        // Redirect to register page
    }

    if (confirmed && !confirmed.isUserConfirmed) {
        throwError('Email is not verified please Verify the mail', 402);
        // Redirect a to page to verify email
    }

    const value = await bcrypt.compare(userObj.password, confirmed.password);
    if (!value) {
        await otpService.sendActions(userObj.email, 'Login attempt failed', `Login failed for <strong>${userObj.email}</strong> at ${new Date()}. Please contact support team if you didn't done this attempt.`);
        throwError('Invalid email or password', 400);
    }
    return true;
};

userService.forgotPassword = async (obj) => {
    const result = await db.users.findOne({ email: obj.email });
    if (!result) {
        throwError('Email is Invalid', 400);
    }
    return true;
};

module.exports = userService;
