const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const errorLogger = require('./utilities/errorlogger');

const product = require('./routes/product');
const orders = require('./routes/order');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = 4000;

app.use('/products', product);
app.use('/orders', orders);

app.use(errorLogger);

app.listen(port, () => {
    console.log(`Product Server running on port ${port}...`);
});

module.exports = app;
