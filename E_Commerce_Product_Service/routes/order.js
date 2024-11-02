const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const orderService = require('../services/orderService');

dotenv.config();

router.post('/createOrder', async (req, res, next) => {
    try {
        // console.log(req.body);
        const email = jwt.verify(req.body.token, process.env.SECRET_KEY);
        const result = await orderService.createOrder(email, req.body.value);
        // console.log(result);
        if (result) {
            res.status(200).json({
                message: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/allOrders', async (req, res, next) => {
    try {
        // console.log(req.body);
        const email = jwt.verify(req.body.token, process.env.SECRET_KEY);
        const result = await orderService.allOrders(email);
        // console.log(result)
        res.status(200).send(result[0].orders);
    } catch (err) {
        next(err);
    }
});

router.put('/deleteOrder', async (req, res, next) => {
    try {
        // console.log(req.body);
        const email = jwt.verify(req.body.token, process.env.SECRET_KEY);
        const result = await orderService.deleteOrder(email, req.body);
        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
