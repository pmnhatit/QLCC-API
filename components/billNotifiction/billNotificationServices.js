const billNotiModel = require('./billNotification');
//GET
module.exports.getNotiById = async (noti_id) =>{
    const result = await billNotiModel.findOne({'_id': noti_id, 'is_delete': false});
    return result;
}
module.exports.getNotiByApartId = async (apart_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await billNotiModel.find({'receiver': apart_id, 'is_delete': false},
        null,{
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    return result;
}
//UPDATE
//DELETE