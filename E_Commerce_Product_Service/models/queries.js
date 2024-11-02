/* eslint-disable max-len */
const db = require('./productSchema');

const instance = {};

instance.generateOrderId = async () => {
    const ids = await db.orders.distinct('orders.orderId');

    if (ids.length < 1) {
        return 1;
    } else {
        const orderId = Math.max(...ids);
        return orderId + 1;
    }
};

instance.createOrder = async (email, value) => {
    const orderId = await instance.generateOrderId();
    value.forEach((element) => {
        element.orderId = orderId;
    });
    const update2 = await db.orders.updateOne({ email }, { $push: { orders: { $each: value } } }, { upsert: true, new: true });
    // console.log(update2);
    if (update2.modifiedCount > 0 || update2.upsertedCount > 0) {
        for (let i = 0; i < value.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const result = await db.products.updateOne({ id: value[i].id }, { $inc: { stock: -value[i].quantity } });
        }
        // console.log(update2, 'model');
        return update2;
    } else {
        return null;
    }
};

instance.deleteOrder = async (email, id, orderId, quantity) => {
    const result = await db.orders.updateOne({ email }, { $pull: { orders: { id, orderId } } });
    // console.log(email, id, orderId, quantity);
    // console.log(result);
    if (result.modifiedCount > 0) {
        // eslint-disable-next-line no-await-in-loop
        // console.log(email, id, orderId, quantity);
        const res = await db.products.updateOne({ id }, { $inc: { stock: quantity } });
        if (res) {
            return true;
        }
    } else {
        return null;
    }
};

module.exports = instance;
