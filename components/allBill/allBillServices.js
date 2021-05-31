const mongoose = require('mongoose');

const allBillModel = require('./allBill');
//GET
module.exports.getBillByApartId = async (apart_id, month, year) =>{
    const result = await allBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getAllByIsPayStatus = async (apart_id, status) =>{
    const result = await allBillModel.find({'apart_id': apart_id, 'is_pay': status, 'is_delete': false});
    return result;
}
module.exports.getBillById = async (bill_id) =>{
    const result = await allBillModel.findOne({'_id': bill_id});
    return result;
}
//UPDATE
module.exports.updateReport = async (bill_id, image) =>{
    mongoose.set('useFindAndModify', false);
    const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
    {'image': image, 'report': true},
    {new: true});
    return result;
}
// module.exports.updateImage = async (image, bill_id) =>{
//     mongoose.set('useFindAndModify', false);
//     const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
//     {'image': image},
//     {new: true});
//     return result;
// }
// module.exports.changeReportStatus = async (bill_id) =>{
//     mongoose.set('useFindAndModify', false);
//     const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
//     {'report': true},
//     {new: true});
//     return result;
// }