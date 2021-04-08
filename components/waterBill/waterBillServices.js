const waterBillModel = require('./waterBill');
// const unitPriceServices = require('../unitPrice/unitPriceServices');
const cal = require('../../services/calculate/calculate');
//GET
module.exports.getWaterBillByApartmentId = async (id)=>{
    const result = await waterBillModel.find({'apart_id': id, 'is_delete': false});
    return result;
}
module.exports.getWaterBillByMonth = async (apart_id, month, year)=>{
    const result = await waterBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getWaterBillById = async (bill_id) =>{
    const result = await waterBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}