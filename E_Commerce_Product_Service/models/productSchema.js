const mongoose = require('mongoose');
const throwError = require('../utilities/throwError');

const url = 'mongodb://127.0.0.1:27017/dummyData';

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        try {
            console.log('DB connection successful!');
        } catch (err) {
            throwError(err.message, 500);
        }
    });

const productSchema = mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    pngIcon: { type: String, required: true },
}, { collection: 'products' });

const orderSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    orders: [{
        orderId: { type: Number, unique: true, required: true },
        id: { type: Number, unique: true, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPercentage: { type: Number, required: true },
        rating: { type: Number, required: true },
        stock: { type: Number, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        thumbnail: { type: String, required: true },
        images: { type: [String], required: true },
        pngIcon: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
}, { collection: 'orders' });

exports.products = mongoose.model('products', productSchema);
exports.orders = mongoose.model('orders', orderSchema);
