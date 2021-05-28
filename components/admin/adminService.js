const adminModel = require('./admin');

//GET
module.exports.getTokenDevice = async (data) =>{
    const {...query} = data;
    data.is_delete = false;
    const result = adminModel.find(query);
    return result;
}