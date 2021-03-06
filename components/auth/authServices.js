const authModel = require('./auth');
const bcrypt = require('bcryptjs');
//GET
module.exports.getUserByUsername = async (username) =>{
    console.log("Vo getUser");
    const result = await authModel.findOne({username: username});
    return result;
}
module.exports.getUserById = async (user_id) =>{
    const result = await authModel.findOne({'_id': user_id});
    return result;
}
//CREATE
module.exports.createUser = async (username, password, name, phone, email, identify_card, native_place, apartment_id, auth) =>{
    console.log("Vo create");
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new authModel({ username, password: hash, name, phone, email, identify_card, native_place, apartment_id, auth});
    return newUser.save();
}
//UPDATE
module.exports.updateAvatar = async (user_id, avatar)=>{
    const result = await authModel.updateOne({'_id': user_id},{$set: {'avatar': avatar}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
}
//DELETE