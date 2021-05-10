const notiServices = require('./notiServices');
//GET
module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const {page, limit} = req.params;
        const result = await notiServices.getAllNotification(page, limit);
        res.json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getNotificationByUserId = async (req, res, next) =>{
    try {
        const {user_id, page, limit} = req.params;
        const notices = await notiServices.getNotificationByUserId(user_id, page, limit);
        res.status(200).json({data: notices})
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNotiUnreadByUserId = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const notices = await notiServices.getNotiUnreadByUserId(user_id);
        const num = notices.length;
        res.status(200).json({num_unread: num});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateIsReadStatus = async (req, res, next) =>{
    try {
        const {notice_id, user_id, status} = req.body;
        const notice = await notiServices.changeIsReadStatus(notice_id, user_id, status);
        res.status(200).json({data: notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}