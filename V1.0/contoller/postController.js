const PostModel = require('../../models/postModel');
const path = require("path")
const multer = require("multer")
const dotenv = require('dotenv');
const FormData = require('form-data');
dotenv.config();
const axios = require('axios');

const { v4: uuidv4 } = require('uuid');
const { use } = require('../apiRoutes/userRoutes');
const UserModel = require('../../models/userModel');

exports.createPost = async(req,res)=>{
    const user = req.user;
    const form = new FormData();
    req.files.forEach(element => {
        form.append('photo', element.buffer, {
            filename: element.originalname,
            contentType: element.mimetype,
            knownLength: element.size
        }); 
    });
    // const mediaUploadResult = await axios({
    //     method: "POST",
    //     url: "http://localhost:3002/uploadpostimage",
    //     data: form,
    //     headers: {
    //         'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
    //       },
    // });
    const data = {
        content:req.body.content,
        // images:mediaUploadResult.data.images,
        // videos:mediaUploadResult.data.videos,
        userId:user._id,
        recommended:req.body.recommended,
        rating:req.body.rating,
    };
    const result = await PostModel.create(data);
    const userReuslt = await UserModel.findOneAndUpdate({_id:user._id},{$push:{posts:result._id}});
    res.status(200).json({"message":"Post created successfully"});
}