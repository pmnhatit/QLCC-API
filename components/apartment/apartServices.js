const apartmentModel = require('./apartment');
const authServices = require('../auth/authServices');
//GET
module.exports.getAllApartment = async () =>{
    const result = await apartmentModel.find();
    return result;
}
module.exports.getApartmentById = async (id) =>{
    const result = await apartmentModel.findOne({'_id': id});
    return result;
}
module.exports.getApartmentsByIdUser = async (user_id) =>{
    const user = await authServices.getUserById(user_id);
    let aparts = [];
    for(let i=0; i<user.apartment_id.length; i++){
        const apart = await this.getApartmentById(user.apartment_id[i]);
        aparts.push(apart);
    }
    return aparts;
}
module.exports.getAllApartsForRent = async ()=>{
    const aparts = await apartmentModel.find({'status': 1});
    return aparts;
}
//CREATE
module.exports.createApartment = async (name, block, area, images, status) =>{
    const new_apart = new apartmentModel({name, block, area, images, status});
    return await new_apart.save();
}
//UPDATE
//DELETE
