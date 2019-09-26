//Validation

const Joi= require('@hapi/joi');

// Register Validation
const registerValidation = (data) =>{

    const userSchema= Joi.object().keys({
        username: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(8)
        .required()
    });

    return userSchema.validate(data);
};

// Login Validation
const loginValidation = (data) =>{

    const userSchema= Joi.object().keys({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(8)
        .required()
    });

    return userSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
