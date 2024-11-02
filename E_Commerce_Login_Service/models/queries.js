const db = require('./users');

const instance = {};

instance.register = async (userObj) => {
    const result = await db.users.create(userObj);
    if (result) {
        return result;
    } else {
        return null;
    }
};

instance.addToQueries = async (obj) => {
    const result = await db.queries.create(obj);
    if (result) {
        return result;
    } else {
        return null;
    }
};

instance.updatePassword = async (obj) => {
    // eslint-disable-next-line max-len
    const result = await db.users.updateOne({ email: obj.email }, { $set: { password: obj.password } });
    if (result.modifiedCount === 1) {
        return true;
    } else {
        return false;
    }
};

instance.postOtp = async (obj) => {
    const result = await db.otp.create(obj);
    if (result) {
        return result;
    } else {
        return null;
    }
};

instance.getOtp = async (id) => {
    const result = await db.otp.findOne({ _id: id });
    if (result) {
        return result;
    } else {
        return null;
    }
};

module.exports = instance;
