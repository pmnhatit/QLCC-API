const apartServices = require('./apartServices');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        console.log("đã vô")
        const apartments = await apartServices.getAllApartment();
        res.json({data: apartments});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
module.exports.getApartmentById = async (req, res, next) =>{
    try {
        console.log("Vô id")
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
        console.log("vô đây")
        const {user_id} = req.params;
        const aparts_info = await apartServices.getApartmentsByIdUser(user_id);
        res.json({data: aparts_info}); 
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
//CREATE
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