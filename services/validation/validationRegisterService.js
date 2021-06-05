const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateRegisterId = async (data) =>{
    const schema = joi.object({
        register_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateRegister = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        service_id: joi.objectId().required(),
        content: joi.string().required(),
        date: joi.number().required(),
        term: joi.number().valid(0,1,2).required()
    });
    const valid = await schema.validate(data);
    return valid;
}