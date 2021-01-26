const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const userServices = require('./userServices');

module.exports.login = async (req, res, next) =>{
    const user = req.user;
    console.log("user: ",user);
    if(user.message==="null"){
        res.status(401).json({message:"username or password invalid"});
    }else{
        console.log("vô else")
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const sign = {username: user.username, id: user.id}
        // const token = jwt.sign(user.username, process.env.KEY_SECRET);
        const token = jwt.sign(sign, process.env.KEY_SECRET);
        console.log("token controller:"+token);
        res.json({message: "200OK", token: token, infoUser: user});
    }
}
module.exports.signUp = async(req, res , next) => {
    try {
        console.log("Vo signup");
        const {username, password, name, phone, email} = req.body;
        console.log("username: ", username);
        const user = await userServices.getUserByUsername(username);
        console.log("user: ",user);
        if(user){

            res.status(401).json({message:"user_exists"});
        }else{
            console.log("Vo else")
            const newUser = await userServices.createUser(username, password, name, phone, email);
            // const newUser = await authService.getUserByUsername(username);
            console.log("đã vô: "+newUser);
            const payload = {username: newUser.username};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            const infoUser = {id: newUser._id,username: newUser.username,name: newUser.name, 
                phone: newUser.phone, email: newUser.email};
            res.json({message: "200OK", token: token, infoUser: infoUser});
        }
    } catch (error) {
        res.status(500).json({message:"errors",error:error});
    }
}