const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateBlockId = async (data) =>{
    const schema = joi.object({
        block_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}