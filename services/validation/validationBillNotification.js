const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetNotiById = async (data) =>{
    const schema = joi.object({
        noti_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateGetNotiByApartId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        limit: joi.number().min(1).required(),
        page: joi.number().min(1).required()
    });
    const valid = await schema.validate(data);
    return valid;
}