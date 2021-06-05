const blockServices = require('./blockServices');
const {validateBlockId} = require('../../services/validation/validationBlock');
//GET
module.exports.getAllBlocks = async (req, res, next) =>{
    try {
        const blocks = await blockServices.getAllBlocks();
        res.status(200).json({data: blocks});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBlockById = async (req, res, next) =>{
    try {
        const {block_id} = req.params;
        const valid = await validateBlockId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const block = await blockServices.getBlockById(block_id);
            res.status(200).json({data: block});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}