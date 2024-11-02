const express = require('express');
const Joi = require('joi');
const otpService = require('../services/otp');

const router = express.Router();

const otpSchema = Joi.object({
    email: Joi.string().required(),
    action: Joi.string().required().valid('register', 'login', 'forgotPassword', 'verifyemail'),
});

router.post('/generateOtp', async (req, res, next) => {
    try {
        const value = await otpSchema.validateAsync(req.body);
        const result = await otpService.generateOtp(value);
        if (result) {
            res.status(200).json({
                message: `OTP Sent Successfully To Email ${req.body.email}`,
                // eslint-disable-next-line no-underscore-dangle
                data: { id: result._id },
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/verifyOtp', async (req, res, next) => {
    try {
        const request = await fetch('https://ipinfo.io/json?token=71853d4edc37b5');
        const response = await request.json();
        req.ipAddress = response.ip;
        const result = await otpService.verifyOtp(req.body, req.ipAddress);
        if (result) {
            res.status(200).json({
                message: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
