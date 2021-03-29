const blockModel = require('./block');
//GET
module.exports.getAllBlocks = async () =>{
    const result = await blockModel.find();
    return result;
}
module.exports.getBlockById = async (id) =>{
    const result = await blockModel.findOne({'_id': id});
    return result;
}
//CREATE
module.exports.createBlock = async (name) =>{
    const new_block = new blockModel({name});
    return await new_block.save();
}
//UPDATE
module.exports.updateBlockById = async (block_id, name) =>{
    const result = await blockModel.findOneAndUpdate({'_id': block_id},
    {$set:{'name': name}},
    {
        new: true
    });
    return result;
}