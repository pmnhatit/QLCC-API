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
module.exports.getAllRepairNoticesForUser = async (req, res, next) =>{
    try {
        const apart_id = req.params.apart_id;
        const repair_notices = await repairServices.getAllRepairNoticesForUser(apart_id);
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createRepairNotice = async (req, res, next) =>{
    try {
        const {title, content, apart_id, author, image} = req.body;
        const repair_notice = await repairServices.createRepairNotice(title, content, apart_id, author, image);
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