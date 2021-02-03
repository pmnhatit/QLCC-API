const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var otherBillSchema = new mongoose.Schema({
    apart_id: String,
    apart_management: Number,
    parking_fees: Number,
    maintenance_fee: Number,
    service_charge: Number,
    other_fees: {
        type: Number,
        default: 0
    },
    month: Number,
    year: Number,
    note: String
},
    {
        collection: 'other_bill'
    });

const otherBill = db.useDb("qlcc").model("other_bill", otherBillSchema);

module.exports = otherBill;