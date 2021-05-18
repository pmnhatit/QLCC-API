const mongoose = require('mongoose');

const notiParkingModel = require('./notificationParking');

//GET
module.exports.getNoticeById = async (notice_id) =>{
    const result = await notiParkingModel.findOne({'_id': notice_id, 'is_delete': false});
    return result;
}
module.exports.getNoticesByUserId = async (user_id) =>{
    const result = await notiParkingModel.find({$or:[{'receiver': user_id}, {'author': user_id}], 'is_delete': false}).sort({$natural: -1});;
    return result;
}
module.exports.getNoticesUnread = async (user_id) =>{
    const result = await notiParkingModel.find({'is_read_user': false, 'receiver': user_id, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createNotice = async (user_id, title, content, image) =>{
    const receiver = "admin0";
    const d = new Date();
    const create_date = d.valueOf();
    const notice = new notiParkingModel({title, content, create_date, image, author: user_id, receiver, is_read_admin: false, is_read_user: true, type: 0});
    return await notice.save();
}
//UPDATE
module.exports.changeIsRead = async (notice_id) =>{
    mongoose.set('useFindAndModify', false);
    const query = { '_id': notice_id};
    const updateDocument = {
        $set: { "is_read_user": true }
    };
    const result = await notiParkingModel.findOneAndUpdate(query,
    updateDocument,
    {new: true});
    return result;
}