const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorLogger = require('./utilities/errorlogger');

const authRouter = require('./routes/auth');
const otpRouter = require('./routes/otp');
const queryRouter = require('./routes/customerQuery');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/otp', otpRouter);
app.use('/query', queryRouter);

const port = 3001;

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use(errorLogger);

app.listen(port, () => {
    console.log(`Login Server running on port ${port}...`);
});

module.exports = app;
