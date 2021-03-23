const notiModel = require('./notification');
//GET
module.exports.getAllNotification = async ()=>{
    const result = notiModel.find();
    return result;
}
//CREATE
module.exports.createNotification = async (title, content, date, author) =>{
    const newNoti = new notiModel({title, content, date, author});
    return await newNoti.save();
}