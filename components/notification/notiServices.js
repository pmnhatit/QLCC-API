const notiModel = require('./notification');
const authServices = require('../auth/authServices');
//GET
module.exports.getAllNotification = async (page)=>{
    const sk = (page-1)*10;
    const result = notiModel.find(null,
        null,{
            skip: sk,
            limit: 10
        }).sort({$natural: -1});
    return result;
}
module.exports.getNotificationByUserId = async (user_id, page) =>{
    const sk = (page-1)*10;
    const result = notiModel.find({'receivers.user_id': user_id},null,
        {
            skip: sk,
            limit: 10
        }).sort({$natural: -1});
    console.log(result);
    return result;
}
//CREATE
module.exports.createNotification = async (title, content, image, link, type) =>{
    let receivers = [];
    if(type==="0"){
        const users = await authServices.getAllUser();
        for(let i=0; i<users.length; i++){
            const receiver = {
                user_id: users[i]._id            
            }
            receivers.push(receiver);
        }
    }else{
        const users = await authServices.getAllUserByBlockId(type);
        for(let i=0; i<users.length; i++){
            const receiver = {
                user_id: users[i]._id            
            }
            receivers.push(receiver);
        }
    }
    const create_date = new Date().toLocaleString();
    const newNoti = new notiModel({title, content, image, link, create_date, type, receivers});
    return await newNoti.save();
}