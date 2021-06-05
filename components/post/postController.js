const postServices = require('./postService');
const {validateCreatePost, validatePostId} = require('../../services/validation/validationPost');

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
        const valid = await validateCreatePost(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.createPost(user_id, title, content, contact, images);
            res.status(200).json({data: post});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deletePost = async (req, res, next) =>{
    try {
        const {post_id} = req.body;
        const valid = await validatePostId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.deletePost(post_id);
            if(post==null){
                res.status(400).json({message: "Post id incorrect"});
            }else{
                res.status(200).json();
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}