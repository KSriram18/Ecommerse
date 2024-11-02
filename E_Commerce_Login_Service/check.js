const Joi = require('joi');

const otpSchema = Joi.object({
    otp: Joi.string().required().email(),
});
const a = async () => {
    const req = await fetch('https://ipinfo.io/json?token=71853d4edc37b5');
    const response = await req.json();
    console.log(response);
    const value = await otpSchema.validateAsync({ otp: 'a@gmail.com' });
    console.log(value);
};

a();
