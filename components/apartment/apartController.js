const apartServices = require('./apartServices');

module.exports.getApartmentById = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const apart_info = await apartServices.getApartmentById(id);
        res.json({data: apart_info});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getApartmentByIdUser = async (req, res, next) =>{
    try {
        const {id_user} = req.params;
        const aparts_info = await apartServices.getApartmentsByIdUser(id_user);
        res.json({data: aparts_info}); 
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
module.exports.createApartment = async (req, res, next) =>{
    try {
        const {name, block} = req.body;
        const new_apart = await apartServices.createApartment(name, block);
        res.json({data: new_apart});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}