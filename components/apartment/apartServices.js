const apartmentModel = require('./apartment');

module.exports.getApartmentById = async (id) =>{
    const result = await apartmentModel.findOne({'_id': id});
    return result;
}
module.exports.createApartment = async (name, block) =>{
    const new_apart = new apartmentModel({name, block});
    return new_apart.save();
}