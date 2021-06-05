const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateApartmentId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUserId = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}