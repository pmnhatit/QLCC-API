const postModel = require('./post');

//GET
module.exports.getPost = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await postModel.find(query,
        null,
        {
            sort: {create_date: -1}
        });
    return result;
}
//CREATE
module.exports.createPost = async (user_id, title, content, contact, images) =>{
    const d = new Date();
    const create_date = d.valueOf();
    const status = 0, is_read = false;
    const new_post = new postModel({user_id, title, content, contact, images, create_date, status, is_read});
    return await new_post.save();
}