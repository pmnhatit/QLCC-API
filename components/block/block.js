const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var blockSchema = new mongoose.Schema({
    name: String
},
    {
        collection: 'block'
    });

const block = db.useDb("qlcc").model("block", blockSchema);

module.exports = block;