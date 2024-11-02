/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const throwError = require('../utilities/throwError');
const model = require('../models/queries');
const db = require('../models/productSchema');

const productService = {};

productService.getCategories = async () => {
    const result = await db.products.aggregate([{ $group: { _id: '$category', pngIcon: { $first: '$pngIcon' } } }]);
    if (!result[0]._id || !result[0].pngIcon) {
        throwError('Fetching Categories Failed Due To Internal Server Error', 500);
    }
    result.map((value) => {
        const b = value._id.replace('-', ' ');
        return [b, value.pngIcon];
    });
    return result;
};

productService.fetchAllProducts = async () => {
    const result = await db.products.find({}, { _id: 0 });
    if (result.length === 0) {
        throwError('Fetching Products Failed Due To Internal Server Error', 500);
    }
    return result;
};

productService.todayDeals = async () => {
    const result = await db.products.find({}, { _id: 0 }).limit(15);
    if (result.length === 0) {
        throwError('Fetching Today Deal\'s Failed Due To Internal Server Error', 500);
    }
    return result;
};

productService.getSpecificCategory = async (category) => {
    const result = await db.products.find({ category }, { _id: 0 });
    if (result.length === 0) {
        throwError(`Fetching ${category} Failed Due To Internal Server Error`, 500);
    }
    return result;
};

productService.getSpecificProduct = async (id) => {
    const result = await db.products.find({ id }, { _id: 0 });
    if (result.length === 0) {
        throwError(`No Product Found With Id ${id}`, 400);
    }
    return result;
};

productService.productSearch = async (input) => {
    const result = await db.products.find({
        $or: [
            { category: { $regex: input, $options: 'i' } },
            { title: { $regex: input, $options: 'i' } },
            { description: { $regex: input, $options: 'i' } },
        ]
    }, { _id: 0 });
    if (result.length === 0) {
        throwError('No Products Found', 400);
    }
    return result;
};

module.exports = productService;
