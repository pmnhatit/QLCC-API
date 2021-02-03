const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var unitPriceSchema = new mongoose.Schema({
    electric: Number,
    water: Number,
    moto_fee: Number,
    car_fee: Number
},
    {
        collection: 'unit_price'
    });

const unitPrice = db.useDb("qlcc").model("unit_price", unitPriceSchema);

module.exports = unitPrice;