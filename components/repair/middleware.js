const repairServices = require('./repairServices');
const checkNoticeByUser = async (req, res, next) =>{
    console.log(req.user);
    const {notice_id} = req.params;
    const {id} = req.user;
    const notice = await repairServices.getRepairNoticeById(notice_id);
    if(notice==null){
        res.status(404).json();
    }else{
        if(notice.author===id){
            next();
        }else{
            res.status(400).json({message: "Cann't delete this notice!"});
        }
    }
}
module.exports = checkNoticeByUser;