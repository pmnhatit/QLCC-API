const notiModel = require('./notification');

module.exports.getAllNotification = async ()=>{
    const result = notiModel.find();
    return result;
}
module.exports.createNotification = async (title, content, date, author) =>{
    const newNoti = new notiModel({title, content, date, author});
    return newNoti.save();
}