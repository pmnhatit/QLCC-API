const mongoose = require('mongoose');

const apartmentModel = require('./apartment');
const authServices = require('../auth/authServices');
//const block = require('../block/block');
//GET
module.exports.getAllApartment = async () =>{
    const result = await apartmentModel.find({'is_delete': false});
    return result;
}
module.exports.getApartmentById = async (id) =>{
    const result = await apartmentModel.findOne({'_id': id, 'is_delete': false});
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
module.exports.getAllApartsEmpty = async ()=>{
    const aparts = await apartmentModel.find({'status': 1, 'is_delete': false});
    return aparts;
}
//chua dung
module.exports.getApartsByStatus = async (status) =>{
    const aparts = await apartmentModel.find({'status': status, 'is_delete': false});
    return aparts;
}//chua dung
