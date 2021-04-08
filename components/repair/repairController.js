const repairServices = require('./repairServices');
//GET
module.exports.getAllRepairNoticesByIdUser = async (req, res, next) =>{
    try {
        const {user_id, page, limit} = req.params;
        const repair_notices = await repairServices.getAllRepairNoticesByIdUser(user_id, page, limit);
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getRepairNoticeById = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const notice = await repairServices.getRepairNoticeById(notice_id);
        res.status(200).json({data: notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error)
    }
}
module.exports.getRepairNoticeByStatus = async (req, res, next) =>{
    try {
        const {user_id, page, limit, status} = req.params;
        const notices = await repairServices.getRepairNoticeByStatus(user_id, page, limit, status);
        res.status(200).json({data: notices});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error)
    }
}
//CREATE
module.exports.createRepairNotice = async (req, res, next) =>{
    try {
        const {title, content, author, image} = req.body;
        const repair_notice = await repairServices.createRepairNotice(title, content, author, image);
        res.status(200).json({data: repair_notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {notice_id, user_status} = req.body;
        const new_notice = await repairServices.updateIsReadStatus(notice_id, user_status);
        res.status(200).json({data: new_notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteRepairNotice = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const new_notice = await repairServices.deleteRepairNotice(notice_id);
        res.status(200).json({data: new_notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}