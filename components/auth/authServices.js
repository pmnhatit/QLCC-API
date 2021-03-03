const authModel = require('./auth');
const bcrypt = require('bcryptjs');

module.exports.getUserByUsername = async (username) =>{
    console.log("Vo getUser");
    const result = await authModel.findOne({username: username});
    return result;
}
module.exports.getUserById = async (id_user) =>{
    const result = await authModel.findOne({'_id': id_user});
    return result;
}
module.exports.createUser = async (username, password, name, phone, email, identify_card, native_place, apartment_id, auth) =>{
    console.log("Vo create");
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new authModel({ username, password: hash, name, phone, email, identify_card, native_place, apartment_id, auth});
    return newUser.save();
}