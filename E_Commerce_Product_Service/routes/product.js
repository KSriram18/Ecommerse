const express = require('express');

const router = express.Router();
const productService = require('../services/productService');

router.get('/categories', async (req, res, next) => {
    try {
        const result = await productService.getCategories();
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/fetchProducts', async (req, res, next) => {
    try {
        const result = await productService.fetchAllProducts();
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/todayDeals', async (req, res, next) => {
    try {
        const result = await productService.todayDeals();
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/categories/:category', async (req, res, next) => {
    try {
        const result = await productService.getSpecificCategory(req.params.category);
        if (result) {
            res.status(200).json({
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/product/:id', async (req, res, next) => {
    try {
        const result = await productService.getSpecificProduct(req.params.id);
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/search/:value', async (req, res, next) => {
    try {
        const result = await productService.productSearch(req.params.value);
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
