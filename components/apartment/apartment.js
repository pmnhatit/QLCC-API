const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var apartmentSchema = new mongoose.Schema({
    name: String,
    block: String,
    area: Number,
    images: [{
        type: String
    }],
    status: Number//1: con trong | 2: da thue | 3: da ban
},
    {
        collection: 'apartment'
    });

const apartment = db.useDb("qlcc").model("apartment", apartmentSchema);

module.exports = apartment;