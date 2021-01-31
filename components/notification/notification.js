const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var notiSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    author: String
},
    {
        collection: 'notification'
    });

const notification = db.useDb("qlcc").model("notification", notiSchema);

module.exports = notification;