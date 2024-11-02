const throwError = require('../utilities/throwError');
const model = require('../models/queries');
const db = require('../models/productSchema');

const orderService = {};

orderService.createOrder = async (email, value) => {
    const result = await model.createOrder(email, value);
    if (!result) {
        throwError('Creating Order Failed Due To Internal Server Error', 500);
    }
    return result;
};

orderService.allOrders = async (email) => {
    const result = await db.orders.find({ email }, { _id: 0, orders: 1 });
    // console.log(result);
    if (result.length === 0) {
        throwError('Fetching orders failed due to internal server error', 500);
    }
    return result;
};

orderService.deleteOrder = async (email, value) => {
    // console.log(value, '24');
    // eslint-disable-next-line max-len
    const result = await model.deleteOrder(email, value.value.id, value.value.orderId, value.value.quantity);
    if (!result) {
        throwError('Deleting the order item failed due to internal server error', 500);
    }
    return result;
};

module.exports = orderService;
