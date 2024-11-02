const express = require('express');
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const joiPassword = Joi.extend(joiPasswordExtendCore);
const userService = require('../services/user');

const router = express.Router();

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword
        .string()
        .min(6)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
    name: Joi.string().max(20).required(),
    mobileNumber: Joi.number().required().integer(),
});

router.post('/register', async (req, res, next) => {
    try {
        const value = await userSchema.validateAsync(req.body);
        const result = await userService.register(value);
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/verifyemail', async (req, res, next) => {
    try {
        const result = await userService.verifyEmail(req.body);
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const result = await userService.getUsers();
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
});
router.post('/users', async (req, res, next) => {
    try {
        const result = await userService.toggleUser(req.body.email, req.body.isUserConfirmed);
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        if (result) {
            const token = jwt.sign(req.body.email, process.env.SECRET_KEY);
            // console.log(token)
            res.status(200).json({
                data: result,
                token,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/forgotPassword', async (req, res, next) => {
    try {
        const result = await userService.forgotPassword(req.body);
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
