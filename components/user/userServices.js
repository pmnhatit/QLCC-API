const userModel = require('./user');
const bcrypt = require('bcryptjs');

module.exports.getUserByUsername = async (username) =>{
    console.log("Vo getUser");
    const result = await userModel.findOne({username: username});
    return result;
}
module.exports.createUser = async (username, password, name, phone, email) =>{
    console.log("Vo create");
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new userModel({ username, password: hash, name, phone, email});
    return newUser.save();
}