const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateRepairId = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateRepairNotice = async (data) =>{
    const schema = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        author: joi.objectId().required(),
        image: joi.string().allow(""),
        type: joi.number().valid(0,1,2).required(),
        apart_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateEvaluationRepair = async (data) =>{
    const schema = joi.object({
        comment: joi.string().required(),
        notice_id: joi.objectId().required(),
        image: joi.string().allow(""),
        status_like: joi.boolean().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateChangeIsRead = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required(),
        user_status: joi.boolean().required()
    });
    const valid = await schema.validate(data);
    return valid;
}