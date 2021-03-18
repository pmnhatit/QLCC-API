const { cloudinary } = require('../../services/cloudinary/cloudinary');
const authServices = require('../auth/authServices');

// module.exports.uploadImageAvatar = async (req, res, next) =>{
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'datn-qlcc',
//         });
//         console.log(uploadResponse);
//         const {user_id} = req.params;
//         const avatar = uploadResponse.url;
//         // await authServices.updateAvatar(user_id, avatar);
//         res.json({ data: avatar});
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// }
module.exports.uploadImage = async (req, res, next) =>{
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'datn-qlcc',
        });
        console.log(uploadResponse);
        const public_id = uploadResponse.public_id;
        const url = uploadResponse.url;
        res.json({ data: public_id});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json({error});
    }
}
module.exports.deleteImage = async (req, res, next) =>{
    try {
        const {public_id} = req.body;
        const deleteResponse = await cloudinary.uploader.destroy(public_id);
        console.log(deleteResponse);
        if(deleteResponse==="ok"){
            res.status(202).json({public_id});
        }else{
            res.status(204).json({message: "Not found"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}