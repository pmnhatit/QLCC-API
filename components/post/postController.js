const postServices = require('./postService');

//GET
module.exports.getPost = async (req, res, next) =>{
    try {
        const posts = await postServices.getPost(req.query);
        res.status(200).json({data: posts});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createPost = async (req, res, next) =>{
    try {
        const {user_id, title, content, contact, images} = req.body;
        const post = await postServices.createPost(user_id, title, content, contact, images);
        res.status(200).json({data: post});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}