const notiServices = require('./notiServices');
const {validateGetAllNotification, validateGetNotiUnreadByUserId,
    validateGetNotificationByUserId, validateUpdateIsReadStatus} = require('../../services/validation/validationNotification');
//GET
module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const {page, limit} = req.params;
        const valid = await validateGetAllNotification(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const result = await notiServices.getAllNotification(page, limit);
            res.status(200).json({data: result});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getNotificationByUserId = async (req, res, next) =>{
    try {
        const {apart_id, page, limit} = req.params;
        const valid = await validateGetNotificationByUserId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notices = await notiServices.getNotificationByUserId(apart_id, page, limit);
            res.status(200).json({data: notices})
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNotiUnreadByUserId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const valid = await validateGetNotiUnreadByUserId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notices = await notiServices.getNotiUnreadByUserId(apart_id);
            const num = notices.length;
            res.status(200).json({num_unread: num});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateIsReadStatus = async (req, res, next) =>{
    try {
        const {notice_id, apart_id, status} = req.body;
        const valid = await validateUpdateIsReadStatus(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiServices.changeIsReadStatus(notice_id, apart_id, status);
            if(notice==null){
                res.status(400).json({message: "Parameter incorrect!"})
            }else{
                res.status(200).json({data: notice});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}