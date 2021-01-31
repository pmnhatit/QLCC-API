const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var apartmentSchema = new mongoose.Schema({
    name: String,
    block: String
},
    {
        collection: 'apartment'
    });

const apartment = db.useDb("qlcc").model("apartment", apartmentSchema);

module.exports = apartment;