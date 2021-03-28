const notiServices = require('./notiServices');
//GET
module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const {page} = req.params;
        const result = await notiServices.getAllNotification(page);
        res.json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getNotificationByUserId = async (req, res, next) =>{
    try {
        console.log("đã vô")
        const {user_id, page} = req.params;
        const notices = await notiServices.getNotificationByUserId(user_id, page);
        res.status(200).json({data: notices})
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(500);
    }
}
//CREATE
module.exports.createNotification = async (req, res, next) =>{
    try {
        const {title, content, type, image, link} = req.body;
        const newNoti = await notiServices.createNotification(title, content, image, link, type);
        // console.log("new: ",newNoti);
        res.status(200).json({data: newNoti});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}