const billNotiServices = require('./billNotificationServices');
const {validateGetNotiByApartId, validateGetNotiById} = require('../../services/validation/validationBillNotification');
//GET
module.exports.getNotiById = async (req, res, next) =>{
    try {
        const {noti_id} = req.params;
        const valid = await validateGetNotiById(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const noti = await billNotiServices.getNotiById(noti_id);
            res.status(200).json({data: noti});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNotiByApartId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const {limit, page} = req.query;
        const query = {
            apart_id: apart_id,
            limit: limit,
            page: page
        };
        const valid = await validateGetNotiByApartId(query);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notis = await billNotiServices.getNotiByApartId(apart_id, page, limit);
            res.status(200).json({data: notis});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}