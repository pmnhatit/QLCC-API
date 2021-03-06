const { cloudinary } = require('../../services/cloudinary/cloudinary');
const authServices = require('../auth/authServices');

module.exports.uploadImage = async (req, res, next) =>{
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'datn-qlcc',
        });
        console.log(uploadResponse);
        const {user_id} = req.params;
        const avatar = uploadResponse.url;
        await authServices.updateAvatar(user_id, avatar);
        res.json({ data: avatar});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}