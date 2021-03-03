const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var authSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    phone: String,
    email: String,
    identify_card: String,
    native_place: String,
    apartment_id: [{
        type: String
    }],
    auth: Number// 1: admin, 2: user
},
    {
        collection: 'user'
    });

const user = db.useDb("qlcc").model("user", authSchema);

module.exports = user;