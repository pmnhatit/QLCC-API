const blockModel = require('./block');
const mongoose = require('mongoose');
//GET
module.exports.getAllBlocks = async () =>{
    const result = await blockModel.find({'is_delete': false});
    return result;
}
module.exports.getBlockById = async (id) =>{
    const result = await blockModel.findOne({'_id': id, 'is_delete': false});
    return result;
}
