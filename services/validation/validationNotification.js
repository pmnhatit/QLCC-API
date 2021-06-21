const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetAllNotification = async (data) =>{
    const schema = joi.object({
        limit: joi.number().min(1).required(),
        page: joi.number().min(1).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateGetNotificationByUserId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        limit: joi.number().min(1).required(),
        page: joi.number().min(1).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateGetNotiUnreadByUserId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateIsReadStatus = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required(),
        apart_id: joi.objectId().required(),
        status: joi.boolean().required()
    });
    const valid = await schema.validate(data);
    return valid;
}