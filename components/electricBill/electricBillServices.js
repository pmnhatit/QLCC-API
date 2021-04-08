const electricBillModel = require('./electricBill');

//GET
module.exports.getElectricBillByApartmentId = async (id)=>{
    const result = await electricBillModel.find({'apart_id': id, 'is_delete': false});
    return result;
}
module.exports.getElectricBillByMonth = async (apart_id, month, year)=>{
    const result = await electricBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete':false});
    return result;
}
module.exports.getElectricBillById = async (bill_id) =>{
    const result = await electricBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}