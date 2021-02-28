const repairModel = require('./repair');

module.exports.getAllRepairNotices = async () =>{
    const result = await repairModel.find().sort({$natural: -1});
    return result;
}
module.exports.getAllRepairNoticesForUser = async (apart_id) =>{
    const result = await repairModel.find({'apart_id': apart_id, 'receiver': 2}).sort({$natural:-1});
    return result;
}
module.exports.getAllRepairNoticesForAdmin = async () =>{
    const result = await repairModel.find({'receiver': 1}).sort({$natural:-1});
    return result;
}
module.exports.getRepairNoticeById = async (id) =>{
    const result = await repairModel.findOne({'_id': id});
    return result;
}
module.exports.createRepairNotice = async (title, content, appointment_date, apart_id, author) =>{
    let receiver;
    if(author==="admin"){
        receiver = 2;
    }else{
        receiver = 1;
    }
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