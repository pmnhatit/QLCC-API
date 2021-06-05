const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetBillByApartmentId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateGetBillByMonth = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12).required(),
        year: joi.number().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateBillId = async (data) =>{
    const schema = joi.object({
        bill_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}