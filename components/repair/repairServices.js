const repairModel = require('./repair');

module.exports.getAllRepairNotices = async () =>{
    const result = await repairModel.find().sort({$natural: -1});
    return result;
}
module.exports.getAllRepairNoticesForUser = async (user_id) =>{
    const result = await repairModel.find({'receiver': user_id}).sort({$natural:-1});
    return result;
}
module.exports.getRepairNoticeById = async (id) =>{
    const result = await repairModel.findOne({'_id': id});
    return result;
}
module.exports.createRepairNotice = async (title, content, appointment_date, apart_id, author, receiver) =>{
    const is_read = false;
    const create_date = new Date().toLocaleString();
    const newRepairNotice = new repairModel({title, content, appointment_date, create_date, apart_id,
        author, receiver, is_read});
    return newRepairNotice.save();
}
module.exports.updateReadStatusById = async (notice_id, status) =>{
    const result = await repairModel.updateOne({'_id': notice_id}, {$set: {'is_read': status}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
}