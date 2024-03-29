const registerService = require('./registerService.services');
const {validateCreateRegister, validateRegisterId} = require('../../services/validation/validationRegisterService');

//GET
module.exports.getRegisterService = async (req, res, next) =>{
    try {
        const registers = await registerService.getRegisterService(req.query);
        res.status(200).json({data: registers});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createRegisterService = async (req, res, next) =>{
    try {
        const {content, user_id, service_id, date, term} = req.body;
        const valid = await validateCreateRegister(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.createRegister(content, user_id, service_id, date, term);
            res.status(200).json({data: register});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {register_id} = req.body;
        const valid = await validateRegisterId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.changeIsRead(register_id);
            if(register==null){
                res.status(400).json({message: "Register service id incorrect"});
            }else{
                res.status(200).json({data: register});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}