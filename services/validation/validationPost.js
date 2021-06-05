const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validatePostId = async (data) =>{
    const schema = joi.object({
        post_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreatePost = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        title: joi.string().required(),
        content: joi.string().required(),
        contact: joi.string().required(),
        images: joi.array().items(joi.string().allow(""))
    });
    const valid = await schema.validate(data);
    return valid;
}