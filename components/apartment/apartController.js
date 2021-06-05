const apartServices = require('./apartServices');
const {validateApartmentId, validateUserId} = require('../../services/validation/validationApartment');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        const apartments = await apartServices.getAllApartment();
        res.status(200).json({data: apartments});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentById = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const valid = await validateApartmentId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const apart_info = await apartServices.getApartmentById(apart_id);
            res.status(200).json({data: apart_info});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentByIdUser = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const valid = await validateUserId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const aparts_info = await apartServices.getApartmentsByIdUser(user_id);
            res.status(200).json({data: aparts_info});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getAllApartsEmpty = async (req, res, next) =>{
    try {
        const aparts = await apartServices.getAllApartsEmpty();
        res.status(200).json({data: aparts});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}