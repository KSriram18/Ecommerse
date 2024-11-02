const express = require('express');
const otpService = require('../services/otp');
const userService = require('../services/user');
const db = require('../models/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const result = await userService.addToCustomerQueries(req.body);
        if (result) {
            await otpService.sendActions(req.body.email, 'Thanks for contacting us - Admin', '<p>We have recieved your query, and our team is trying resolve the issue ASAP. Our team may contact you if further information is required.</p>');
            res.status(200).json({
                data: 'Thanks for contacting us, we will get back to you shortly',
            });
        }
    } catch (err) {
        next(err);
    }
});
router.get('/', async (req, res, next) => {
    try {
        const result = await userService.getCustomerQueries();
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});
router.post('/resolve', async (req, res, next) => {
    try {
        const result = await db.queries.updateOne({ _id: req.body.id }, { $set: { resolution: req.body.value, status: 'Resolved' } });
        if (result.modifiedCount === 1) {
            console.log(result);
            await otpService.sendActions(req.body.email, 'Resolution for the query - Admin', req.body.value);
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
