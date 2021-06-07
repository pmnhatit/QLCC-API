const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');
const apartmentServices = require('../apartment/apartServices');
const blockServices = require('../block/blockServices');
const {validateGetUserById, validateChangePass,
    validateResetPass, validateUpdateAvatar,
    validateUpdateInfo, validateUpdateResetCode,
    validateUpdateTokenDevice} = require('../../services/validation/validationUser');

module.exports.login = async (req, res, next) =>{
    const user = req.user;
    if(user.message==="null"){
        res.status(400).json();
    }else{
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const sign = {username: user.username, id: user.id}
        const token = jwt.sign(sign, process.env.KEY_SECRET);
        let apart_name = [];
        if(user.apartment_id[0]==""){
            apart_name[0] = "";
        }else{
            for(let i=0; i<user.apartment_id.length; i++){
                const apart = await apartmentServices.getApartmentById(user.apartment_id[i]);
                apart_name[i] = apart.name;
            }
        }
        let block_name = [];
        if(user.block_id[0]==""){
            block_name[0] = "";
        }else{
            for(let i=0; i<user.block_id.length; i++){
                const block = await blockServices.getBlockById(user.block_id[i]);
                block_name[i] = block.name;
            }
        }
        const infoUser = {id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            identify_card: user.identify_card, native_place: user.native_place, apart_id: user.apartment_id, 
            block_id: user.block_id, apart_name: apart_name, block_name: block_name, is_active: user.is_active,
            license_plates: user.license_plates, token_device: user.token_device, avatar: user.avatar, is_delete: user.is_delete};
        res.json({token: token, infoUser: infoUser});
    }
}

//GET
module.exports.getUserById = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const valid = await validateGetUserById(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.getUserById(user_id);
            //Lay ten cua can ho
            let apart_name = [];
            if(user.apartment_id[0]==""){
                apart_name[0] = "";
            }else{
                for(let i=0; i<user.apartment_id.length; i++){
                    const apart = await apartmentServices.getApartmentById(user.apartment_id[i]);
                    apart_name[i] = apart.name;
                }
            }
            //Lay ten toa nha
            let block_name = [];
            if(user.block_id[0]==""){
                block_name[0] = "";
            }else{
                for(let i=0; i<user.block_id.length; i++){
                    const block = await blockServices.getBlockById(user.block_id[i]);
                    block_name[i] = block.name;
                }
            }
            const infoUser = {id: user._id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
                identify_card: user.identify_card, native_place: user.native_place, apart_id: user.apartment_id, 
                block_id: user.block_id, block_name: block_name, apart_name: apart_name, is_active: user.is_active,
                license_plates: user.license_plates, token_device: user.token_device, avatar: user.avatar, is_delete: user.is_delete};
            res.status(200).json({data: infoUser});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{
    try {
        const {name, phone, email, user_id} = req.body;
        const valid = await validateUpdateInfo(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateInfo(user_id, name, phone, email);
            //Lay ten cua can ho
            let apart_name = [];
            if(user.apartment_id[0]==""){
                apart_name[0] = "";
            }else{
                for(let i=0; i<user.apartment_id.length; i++){
                    const apart = await apartmentServices.getApartmentById(user.apartment_id[i]);
                    apart_name[i] = apart.name;
                }
            }
            //Lay ten toa nha
            let block_name = [];
            if(user.block_id[0]==""){
                block_name[0] = "";
            }else{
                for(let i=0; i<user.block_id.length; i++){
                    const block = await blockServices.getBlockById(user.block_id[i]);
                    block_name[i] = block.name;
                }
            }
            const newInfo = {id: user._id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
                identify_card: user.identify_card, native_place: user.native_place, apart_id: user.apartment_id, 
                block_id: user.block_id, block_name: block_name, apart_name: apart_name, is_active: user.is_active,
                license_plates: user.license_plates, token_device: user.token_device, avatar: user.avatar, is_delete: user.is_delete};
            res.status(200).json({data: newInfo});
        }
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateAvatar = async (req, res, next) =>{
    try {
        const {user_id, avatar} = req.body;
        const valid = await validateUpdateAvatar(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateAvatar(user_id, avatar);
            if(user){
                res.status(200).json({data: user.avatar});
            }else{
                res.status(400).json({message: "User id incorrect!"});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateTokenDevice = async (req, res, next) =>{
    try {
        const {user_id, token_device} = req.body;
        const valid = await validateUpdateTokenDevice(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateTokenDevice(user_id, token_device);
            if(user){
                res.status(200).json({data: user.token_device});
            }else{
                res.status(400).json({message: "User id incorrect!"});
            }
        }        
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changePassword = async (req, res, next) =>{
    
    try {
        const {user_id, new_pass, old_pass} = req.body;
        const valid = await validateChangePass(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const check = await authServices.checkOldPassword(user_id, old_pass);
            if(check==false){
                res.status(400).json({message: "Current password is incorrect!"});
            }else{
                const new_user = await authServices.changePassword(user_id, new_pass);
                res.status(200).json({data: new_user});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//RESET PASSWORD
module.exports.updateResetPass = async (req, res, next) =>{
    try {
        const {username} = req.body;
        const valid = await validateUpdateResetCode(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            await authServices.updateResetCode(res, username);
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.resetPass = async (req, res, next) =>{
    try {
        const {username, new_pass, code} = req.body;
        const valid = await validateResetPass(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            await authServices.resetPassword(res, username, new_pass, code);
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}