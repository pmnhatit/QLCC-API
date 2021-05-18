const repairModel = require('./repair');
const mongoose = require('mongoose');
//GET
module.exports.getAllRepairNoticesByIdUser = async (user_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await repairModel.find({'author': user_id, 'is_delete': false},
    null,
    {
        skip: sk,
        limit: l
    }).sort({$natural: -1});
    return result;
}
module.exports.getRepairNoticeById = async (notice_id) =>{
    const result = await repairModel.findOne({'_id': notice_id, 'is_delete':false});
    return result;
}
module.exports.getRepairNoticeByStatus = async (user_id, page, limit, status) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await repairModel.find({'author': user_id, 'status': status, 'is_delete': false},
    null,
    {
        skip: sk,
        limit: l
    }).sort({$natural: -1});
    return result;
}
module.exports.getRepairNotices = async (data, apart_id) =>{
    const {...query} = data;
    query.is_delete = false;
    query.apart_id = apart_id;
    console.log(query);
    var timestamp = 1621375470052;
    var date = new Date(timestamp);

    console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());
    const result = await repairModel.find(query,
        null,
        {
            sort: {create_date: -1}
        });
    return result;
}
//CREATE
module.exports.createRepairNotice = async (title, content, author, image, type, apart_id) =>{
    const d = new Date();
    // const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // const nd = new Date(utc + (3600000));
    // const create_date = nd.valueOf();
    const create_date = d.valueOf();
    var date = new Date(create_date);

    console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());
    const newRepairNotice = new repairModel({title, content, create_date, type, author, apart_id, image});
    return await newRepairNotice.save();
}
//UPDATE
module.exports.updateIsReadStatus = async(notice_id, user_status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id, 'is_delete': false}, 
    {'is_read_user': user_status},
    {
        new: true
    })
    return result;
}
module.exports.updateEvaluationRepair = async (notice_id, comment, image, like_status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id, 'is_delete': false}, 
    {'evaluation.is_evaluate': true, 'evaluation.comment': comment, 'evaluation.image': image, 'evaluation.is_like': like_status},
    {
        new: true
    })
    return result;
}
//DELETE
module.exports.deleteRepairNotice = async (notice_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id}, {'is_delete': true},
    {
        new: true
    })
    console.log(result);
    return result;
}