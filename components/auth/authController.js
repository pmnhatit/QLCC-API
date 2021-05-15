const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');
const apartmentServices = require('../apartment/apartServices');
const blockServices = require('../block/blockServices');
const {validateGetUserById, validateChangePass} = require('../../services/validation/userValidation');

module.exports.login = async (req, res, next) =>{
    const user = req.user;
    if(user.message==="null"){
        res.status(401).json();
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
            block_id: user.block_id, apart_name: apart_name, block_name: block_name,
            license_plates: user.license_plates, token_device: user.token_device, is_delete: user.is_delete};
        res.json({token: token, infoUser: infoUser});
    }
}

//GET
module.exports.getUserById = async (req, res, next) =>{
    try {
        await validateGetUserById(res, req.params);
        const {user_id} = req.params;
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
            block_id: user.block_id, block_name: block_name, apart_name: apart_name,
            license_plates: user.license_plates, token_device: user.token_device, is_delete: user.is_delete};
            res.status(200).json({data: infoUser});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{
    try {
        const {name, phone, email, user_id} = req.body;
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
            block_id: user.block_id, block_name: block_name, apart_name: apart_name,
            license_plates: user.license_plates, token_device: user.token_device, is_delete: user.is_delete};
        res.status(200).json({data: newInfo});
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateAvatar = async (req, res, next) =>{
    try {
        const {user_id, avatar} = req.body;
        await authServices.updateAvatar(user_id, avatar);
        const new_auth = await authServices.getUserById(user_id);
        res.status(200).json({data: new_auth.avatar});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateTokenDevice = async (req, res, next) =>{
    try {
        const {user_id, token_device} = req.body;
        await authServices.updateTokenDevice(user_id, token_device);
        const new_auth = await authServices.getUserById(user_id);
        res.status(200).json({data: new_auth.token_device});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changePassword = async (req, res, next) =>{
    
    try {
        const valid = await validateChangePass(req.body);
        if(valid.error){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const {user_id, new_pass, old_pass} = req.body;
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