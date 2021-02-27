const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var repairSchema = new mongoose.Schema({
    title: String,
    content: String,
    appointment_date: String,
    create_date: String,
    apart_id: String,//ma chung cu
    author: String,
    receiver: String,
    is_read: Boolean
},
    {
        collection: 'repair'
    });

const repair = db.useDb("qlcc").model("repair", repairSchema);

module.exports = repair;