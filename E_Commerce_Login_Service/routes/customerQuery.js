const express = require('express');
const otpService = require('../services/otp');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        // const value = await userSchema.validateAsync(req.body);
        // const result = await userService.register(value);
        await otpService.sendActions(req.body.email, 'Thanks for contacting us - Admin', '<p>We have recieved your query, and our team is trying resolve the issue ASAP. Our team may contact you if further information is required.</p>');
        res.status(200).json({
            data: 'Thanks for contacting us, we will get back to you shortly',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
