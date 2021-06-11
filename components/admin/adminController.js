const adminServices = require('./adminService');

//GET
module.exports.getTokenDevice = async (req, res, next) =>{
    try {
        const admins = await adminServices.getTokenDevice(req.query);
        if(admins){
            let tokens = [];
            for(let i=0; i<admins.length; i++){
                if(admins[i].token_device!="" && !tokens.includes(admins[i].token_device)){
                    const token = admins[i].token_device;
                    tokens.push(token);
                }
                if(admins[i].token_device_web!="" && !tokens.includes(admins[i].token_device_web)){
                    const token_web = admins[i].token_device_web;
                    tokens.push(token_web);
                }
            }
            res.status(200).json({data: tokens});
        }else{
            res.status(400).json({message: "No data"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
}