const repairServices = require('./repairServices');

module.exports.getAllRepairNotices = async (req, res, next)=>{
    try {
        const repair_notices = await repairServices.getAllRepairNotices();
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
module.exports.getAllRepairNoticesByUserId = async (req, res, next) =>{
    try {
        const user_id = req.params.user_id;
        const repair_notices = await repairServices.getAllRepairNoticesForUser(user_id);
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createRepairNotice = async (req, res, next) =>{
    try {
        const {title, content, appointment_date, apart_id, author, receiver} = req.body;
        const repair_notice = await repairServices.createRepairNotice(title, content, appointment_date,
            apart_id, author, receiver);
        res.status(201).json({data: repair_notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
module.exports.changeStatusRepairNotice = async (req, res, next) =>{
    try {
        const {notice_id, status} = req.body;
        await repairServices.updateReadStatusById(notice_id, status);
        const repair_notice = await repairServices.getRepairNoticeById(notice_id);
        res.status(200).json({data: repair_notice});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}