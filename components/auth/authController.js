const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');
const apartmentServices = require('../apartment/apartServices');
// const { use } = require('../otherBill');

module.exports.login = async (req, res, next) =>{
    const user = req.user;
    console.log("user: ",user);
    if(user.message==="null"){
        res.status(401).json();
    }else{
        console.log("vô else")
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const sign = {username: user.username, id: user.id}
        const token = jwt.sign(sign, process.env.KEY_SECRET);
        let apart_names = [];
        if(user.apartment_id[0]==""){
            apart_names[0] = "";
        }else{
            for(let i=0; i<user.apartment_id.length; i++){
                const apart_name = await apartmentServices.getApartmentById(user.apartment_id[i]);
                apart_names[i] = apart_name.name;
            }
        }
        const infoUser = {_id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            identify_card: user.identify_card, native_place: user.native_place, block_id: user.block_id, 
            apartment_id: user.apartment_id, apartment_name: apart_names, avatar: user.avatar, 
            auth: user.auth, token_device: user.token_device, is_delete: user.is_delete};
        res.json({token: token, infoUser: infoUser});
    }
}

//GET
module.exports.getAllUserByBlockId = async (req, res, next) =>{
    try {
        const {block_id} = req.params;
        const users = await authServices.getAllUserByBlockId(block_id);
        res.status(200).json({data: users});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getAllUser = async (req, res, next) =>{
    try {
        const users = await authServices.getAllUser();
        res.status(200).json({data: users});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{
    try {
        const {name, phone, email, identify_card, native_place, user_id} = req.body;
        const user = await authServices.updateInfo(user_id, name, phone, email, identify_card, native_place);
        //const user = await authServices.getUserById(user_id);
        let apart_names = [];
        if(user.apartment_id[0]==""){
            apart_names[0] = "";
        }else{
            for(let i=0; i<user.apartment_id.length; i++){
                const apart_name = await apartmentServices.getApartmentById(user.apartment_id[i]);
                apart_names[i] = apart_name.name;
            }
        }
        const newInfo = {_id: user._id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            identify_card: user.identify_card, native_place: user.native_place, block_id: user.block_id, 
            apartment_id: user.apartment_id, apartment_name: apart_names, avatar: user.avatar, 
            auth: user.auth, token_device: user.token_device}
        res.json({data: newInfo});
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
        const {user_id, new_pass, old_pass} = req.body;
        const check = await authServices.checkOldPassword(user_id, old_pass);
        if(check==false){
            res.status(400).json({message: "Current password is incorrect!"});
        }else{
            const new_user = await authServices.changePassword(user_id, new_pass);
            res.status(200).json({data: new_user});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}