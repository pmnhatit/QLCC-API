const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)
const {validation} = require('./rule');

exports.validateGetUserById = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
};
exports.validateChangePass = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        new_pass: joi.string().required(),
        old_pass: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateInfo = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        name: joi.string().required(),
        phone: joi.string().max(10).required(),
        email: joi.string().email({tlds: { allow: ['com', 'net'] }}).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateAvatar = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        avatar: joi.string().allow("").required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateTokenDevice = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        token_device: joi.string().allow("").required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateResetCode = async (data) =>{
    const schema = joi.object({
        username: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateResetPass = async (data) =>{
    const schema = joi.object({
        username: joi.string().required(),
        new_pass: joi.string().required(),
        code: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}