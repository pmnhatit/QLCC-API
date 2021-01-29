const notiServices = require('./notiServices');

module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const result = await notiServices.getAllNotification();
        res.json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createNotification = async (req, res, next) =>{
    try {
        const {title, content, date, author} = req.body;
        const newNoti = await notiServices.createNotification(title, content, date, author);
        // console.log("new: ",newNoti);
        res.json({data: newNoti});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}