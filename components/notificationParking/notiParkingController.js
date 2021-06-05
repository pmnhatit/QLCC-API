const notiParkingServices = require('./notiParkingServices');
const {validateCreate, validateNoticeId, validateUserId} = require('../../services/validation/validationNotificationParking')

//GET
module.exports.getNoticeById = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const valid = await validateNoticeId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.getNoticeById(notice_id);
            res.status(200).json({data: notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNoticesByUserId = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const valid = await validateUserId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notices = await notiParkingServices.getNoticesByUserId(user_id);
            res.status(200).json({data: notices});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNoticesUnread = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const valid = await validateUserId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notices = await notiParkingServices.getNoticesUnread(user_id);
            res.status(200).json({unread: notices.length});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createNotice = async (req, res, next) =>{
    try {
        const {title, content, image, user_id} = req.body;
        const valid = await validateCreate(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.createNotice(user_id, title, content, image);
            res.status(200).json({data: notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {notice_id} = req.body;
        const valid = await validateNoticeId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.changeIsRead(notice_id);
            if(notice==null){
                res.status(400).json({message: "Id incorrect"});
            }else{
                res.status(200).json({data: notice});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}