const otherBillModel = require('./otherBill');

//GET
module.exports.getOtherBillByApartmentId = async (id)=>{
    const result = await otherBillModel.find({'apart_id': id, 'is_delete': false});
    return result;
}
module.exports.getOtherBillByMonth = async (apart_id, month, year)=>{
    const result = await otherBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getOtherBillById = async (bill_id) =>{
    const result = await otherBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}