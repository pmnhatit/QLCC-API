const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)
const {validation} = require('./rule');

exports.validateLogin = async (res, data) =>{
    const schema = joi.object({
        username: validation.username.required(),
        password: validation.password.required()
    });
    const valid = await schema.validate(data);
    if (valid.error) {
        return res.status(400).json({message: "Parameter incorrect"});
    }
};
exports.validateGetUserById = async (res, data) =>{
    console.log("Validate");
    const schema = joi.object({
        user_id: joi.string().required()
    });
    const valid = await schema.validate(data);
    if (valid.error) {
        return res.status(400).json({message: "Parameter incorrect"});
    }
};
exports.validateChangePass = async (data) =>{
    console.log("Validate");
    const schema = joi.object({
        user_id: joi.objectId().required(),
        new_pass: validation.password.required(),
        old_pass: validation.password.required()
    });
    const valid = await schema.validate(data);
    return valid;
}