const mongoose = require('mongoose');

const notiParkingModel = require('./notificationParking');

//GET
module.exports.getNoticeById = async (notice_id) =>{
    const result = await notiParkingModel.findOne({'_id': notice_id, 'is_delete': false});
    return result;
}
module.exports.getNoticesByUserId = async (user_id) =>{
    const result = await notiParkingModel.find({'receiver': user_id, 'is_delete': false}).sort({$natural: -1});;
    return result;
}
//CREATE
module.exports.createNotice = async (user_id, title, content, image) =>{
    const receiver = "admin0";
    const create_date = new Date().toLocaleString();
    const notice = new notiParkingModel({title, content, create_date, image, author: user_id, receiver, type: 0});
    return await notice.save();
}
//UPDATE
module.exports.changeIsRead = async (notice_id) =>{
    mongoose.set('useFindAndModify', false);
    const query = { '_id': notice_id};
    const updateDocument = {
        $set: { "is_read": true }
    };
    const result = await notiParkingModel.findOneAndUpdate(query,
    updateDocument,
    {new: true});
    return result;
}