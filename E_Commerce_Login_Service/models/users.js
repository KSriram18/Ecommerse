const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/E_Commerce';

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        try {
            console.log('DB connection successful!');
        } catch (err) {
            console.log(err.message);
        }
    });

const querySchema = mongoose.Schema({
    name: { type: String, required: true, max: [20, 'Name should not be more than 20 characters'] },
    email: { type: String, required: true },
    mobileNumber: { type: Number },
    query: { type: String },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Resolved'] },
    resolution: { type: String, default: '' },
}, { collection: 'supportQueries' });

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, max: [6, 'Password should be min 6 characters'] },
    name: { type: String, required: true, max: [20, 'Name should not be more than 20 characters'] },
    mobileNumber: { type: Number },
    isUserConfirmed: { type: Boolean, default: false },
}, { collection: 'Users' });

const otpSchema = mongoose.Schema({
    otp: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    action: { type: String, required: true, enum: ['register', 'login', 'forgotPassword', 'verifyemail'] },
}, { collection: 'otpCodes' });

exports.users = mongoose.model('User', userSchema);
exports.otp = mongoose.model('otpCodes', otpSchema);
exports.queries = mongoose.model('supportQueries', querySchema);
