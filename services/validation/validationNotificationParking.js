const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreate = async (data) =>{
    const schema = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        image: joi.string().required(),
        user_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateNoticeId = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required()
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