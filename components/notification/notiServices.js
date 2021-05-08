const mongoose = require('mongoose');

const notiModel = require('./notification');
//GET
module.exports.getAllNotification = async (page, limit)=>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await notiModel.find({'is_delete': false},
        null,{
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    return result;
}
module.exports.getNotificationByUserId = async (user_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await notiModel.find({'receivers.user_id': user_id, 'is_delete': false},null,
        {
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    console.log(result);
    return result;
}
module.exports.getNotiUnreadByUserId = async (user_id) =>{
    const query = {'receivers': {$elemMatch: {'user_id': user_id, 'is_read': false}}, 'is_delete': false};
    const notices = await notiModel.find(query);
    return notices;
}
//UPDATE
module.exports.changeIsReadStatus = async (notice_id, user_id, status)=>{
    mongoose.set('useFindAndModify', false);
    const query = { '_id': notice_id, 'receivers.user_id': user_id };
    const updateDocument = {
        $set: { "receivers.$.is_read": status }
    };
    const result = await notiModel.findOneAndUpdate(query,
    updateDocument,
    {new: true});
    return result;
}