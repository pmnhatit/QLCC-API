const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const authModel = require('./auth');
const apartmentServices = require('../apartment/apartServices');
const blockServices = require('../block/blockServices');

module.exports.checkOldPassword = async (user_id, old_pass) =>{
    const user = await this.getUserById(user_id);
    const result = bcrypt.compareSync(old_pass, user.password);
    return result;
}
//GET
module.exports.getUserByUsername = async (username) =>{
    const result = await authModel.findOne({'username': username, 'is_delete': false});
    return result;
}
module.exports.getUserById = async (user_id) =>{
    const result = await authModel.findOne({'_id': user_id, 'is_delete': false});
    return result;
}
module.exports.getAllUser = async ()=>{
    const result = await authModel.find({'auth': 2, 'is_delete': false});
    return result;
}
module.exports.getAllUserByBlockId = async (block_id) =>{
    const result = await authModel.find({'block_id': block_id, 'is_delete': false});
    return result;
}
//UPDATE
module.exports.updateAvatar = async (user_id, avatar)=>{
    const result = await authModel.updateOne({'_id': user_id},{$set: {'avatar': avatar}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
}
module.exports.updateInfo = async (user_id, name, phone, email) =>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'name': name, 'phone': phone, 'email': email}},
    {
        new: true
    })
    return result;
}
module.exports.updateTokenDevice = async (user_id, token_device) =>{
    const result = await authModel.updateOne({'_id': user_id},{$set: {'token_device': token_device}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
}
module.exports.changePassword = async (user_id, password) =>{
    mongoose.set('useFindAndModify', false);
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await authModel.findByIdAndUpdate({'_id': user_id},
    {'password': hash},
    {
        new:true
    });
    return result;
}
//RESET CODE
module.exports.updateResetCode = async (res, username, email) =>{
    
    const code = Math.floor((Math.random() * (10000-1000)) + 1000);
    const content = `Hello this is apartment management mail system, this is code to reset your password: <h3>${code}<h3><br>This code will expire after 24h!`;
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });
    let mailOptions;
    mailOptions = {
        to: email,
        subject: "Reset Password",
        html: content
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, async (error, response) => {
        if (error) {
            console.log(error);
            return res.status(400).json({message: "Something went wrong!"});
        } else {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            const time_reset = d.valueOf();
            var timestamp = time_reset;
            var date = new Date(timestamp);

            console.log("Date: "+date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
                ":"+date.getMinutes()+
                ":"+date.getSeconds());
            mongoose.set('useFindAndModify', false);
            const result = await authModel.findOneAndUpdate({'username': username},
            {'reset_code': code, 'time_reset_code': time_reset},
            {
                new:true
            });
            return res.status(200).json();
        }
    });
    
}
module.exports.resetPassword = async (res, username, new_pass, code) =>{
    
    const user = await this.getUserByUsername(username);
    if(user==null){
        return res.status(400).json({message: "User incorrect!"});
    }else{
        const d = new Date().valueOf();
        console.log(d);
        var date = new Date(d);

            console.log("Date: "+date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
                ":"+date.getMinutes()+
                ":"+date.getSeconds());
        console.log(user.time_reset_code);
        var date1 = new Date(user.time_reset_code);

            console.log("Date: "+date1.getDate()+
                "/"+(date1.getMonth()+1)+
                "/"+date1.getFullYear()+
                " "+date1.getHours()+
                ":"+date1.getMinutes()+
                ":"+date1.getSeconds());
        if(user.reset_code==code && user.time_reset_code>d){
            let hash = bcrypt.hashSync(new_pass, bcrypt.genSaltSync(10));
            console.log(hash);
            mongoose.set('useFindAndModify', false);
            const user = await authModel.findOneAndUpdate({'username': username},
            {'time_reset_code': d, 'password': hash},
            {
                new:true
            });
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
            license_plates: user.license_plates, token_device: user.token_device, is_delete: user.is_delete};
            return res.status(200).json({data: infoUser});
        }else{
            return res.status(400).json({message: "This code incorrect!"});
        }
    }
    
}