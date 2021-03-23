const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');
const apartmentServices = require('../apartment/apartServices');
const { use } = require('../otherBill');

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
        for(let i=0; i<user.apartment_id.length; i++){
            const apart_name = await apartmentServices.getApartmentById(user.apartment_id[i]);
            apart_names[i] = apart_name.name;
        }
        const infoUser = {id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            identify_card: user.identify_card, native_place: user.native_place, apartment_id: user.apartment_id, 
            apartment_name: apart_names, avatar: user.avatar, auth: user.auth};
        res.json({token: token, infoUser: infoUser});
    }
}
module.exports.signUp = async(req, res , next) => {
    try {
        console.log("Vo signup");
        const {username, password, name, phone, email, identify_card, native_place, apartment_id, auth} = req.body;
        console.log("username: ", username);
        const user = await authServices.getUserByUsername(username);
        console.log("user: ",user);
        if(user){

            res.status(401).json({message:"user_exists"});
        }else{
            console.log("Vo else")
            const newUser = await authServices.createUser(username, password, name, phone, email, identify_card, native_place, apartment_id, auth);
            // const newUser = await authService.getUserByUsername(username);
            console.log("đã vô: "+newUser);
            const payload = {username: newUser.username};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            const infoUser = {id: newUser._id,username: newUser.username,name: newUser.name, 
                phone: newUser.phone, email: newUser.email, identify_card: newUser.identify_card,
                native_place: newUser.native_place, apartment_id: newUser.apartment_id, auth: newUser.auth};
            res.json({token: token, infoUser: infoUser});
        }
    } catch (error) {
        res.status(500).json({error:error});
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{//chua lay danh sach ten cac can ho
    try {
        const {name, phone, email, identify_card, native_place, user_id} = req.body;
        await authServices.updateInfo(user_id, name, phone, email, identify_card, native_place);
        const newInfo = await authServices.getUserById(user_id);
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
        res.status(200).json({data: new_auth});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json({error});
    }
}