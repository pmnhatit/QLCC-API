const blockServices = require('./blockServices');
//GET
module.exports.getAllBlocks = async (req, res, next) =>{
    try {
        const blocks = await blockServices.getAllBlocks();
        res.json({data: blocks});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBlockById = async (req, res, next) =>{
    try {
        const {block_id} = req.params;
        const block = await blockServices.getBlockById(block_id);
        res.json({data: block});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}