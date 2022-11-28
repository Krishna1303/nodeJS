const crypto = require('crypto');
const UserModel = require('../../models/userModel');
const dotenv = require('dotenv');
const sendMail = require('../../sendMail');

const { use } = require('../apiRoutes/userRoutes');


dotenv.config();
exports.createUser = async (req,res)=>{
    try {
        const a = await UserModel.create(req.body);
        const result = {
            email:a.email,
            password:a.password,
            _id:a._id,
            firstName:a.firstName,
            lastName:a.lastName,
            profilePic:a.profilePic,
        }
        res.status(200).json({"message":result});
    } catch (error) {
        console.error(error);
        res.status(409).json({"message":error.message});
    }
};

exports.checkLogin = async(req,res)=>{
    console.log(req.body);
    if(req.body.email && req.body.password){
        const user = await UserModel.findOne({email:req.body.email,password:req.body.password});
        if(user)
            res.status(200).json(user);
        else
            res.status(409).json({"message":"Incorrect details"});    
    }
    else{
        res.status(409).json({"message":"Please pass all the details"});
    }
};

exports.generateForgotPasswordLink = async(req,res)=>{
    if(req.body.email){
        var user = await UserModel.findOne({email:req.body.email});
        if(user){
            const hostname = req.headers.host;
            var link = "";
            const randomToken = generateRandomToken();
            if(hostname.includes('localhost') || hostname.includes('192.168')){
                link += "http://" + hostname;
            }
            else{
                link += "https://" + hostname;
            }
            link += "/api/v1.0/resetpassword" + "?token=" + randomToken;
            var data = {};
            data.email = user.email;
            data.subject = 'Reset password code';
            data.text = `Please type the below code in application. This code will be expired in 5 minutes.\n\n${link}`;
            const result = sendMail(data);
            await UserModel.findOneAndUpdate({email:req.body.email},{forgotPasswordToken:randomToken,forgotPasswordTokeCreatedTime:Date.now()}); 
            res.status(200).json({"message":randomToken});
        }
        else{
            res.status(409).json({"message":"No user found with that details"});    
        }
    }
    else{
        res.status(409).json({"message":"Please pass the email id"});
    }
};
exports.resetPasswordPage = async(req,res)=>{
    if(req.body.token){
        console.log(req.body);
        var user = await UserModel.findOne({forgotPasswordToken:req.body.token});
        if(user){
          const date1 = user.forgotPasswordTokeCreatedTime;
          const date2 = Date.now();
          const diff = Math.abs(date2 - date1);
          if(diff<=5*60*1000){
            if(req.body.password){
                await UserModel.findOneAndUpdate({forgotPasswordToken:req.body.token},{password:req.body.password,forgotPasswordToken:"",forgotPasswordTokeCreatedTime:null,$push:{oldPasswords:user.password}});
                res.status(200).json({message:"Successfully updated your password"});
            }
            else{
                res.status(409).json({message:"Please pass the password"});
            }
          }
          else{
            await UserModel.findOneAndUpdate({forgotPasswordToken:req.body.token},{password:req.body.password,forgotPasswordToken:"",forgotPasswordTokeCreatedTime:null});
            return res.status(409).json({message:"Code is expired"});
          }
        }
        else{
          return res.status(409).json({message:"Code is expired"});
        }
    }
    else{
        res.status(409).json({"message":"Please send forgot password code"});
    }
};

exports.followUser = async(req,res)=>{
    if(req.body.userId){
        await UserModel.findOneAndUpdate({_id:req.body.userId},{$addToSet:{followers:req.user._id}});
        await UserModel.findOneAndUpdate({_id:req.user._id},{$addToSet:{following:req.body.userId}});
        res.status(200).json({message:"Following the user"});
    }
    else{
        return res.status(409).json({message:"Please pass the user id"});
    }
};

exports.unfollowUser = async(req,res)=>{
    if(req.body.userId){
        await UserModel.findOneAndUpdate({_id:req.body.userId},{$pull:{followers:req.user._id}});
        await UserModel.findOneAndUpdate({_id:req.user._id},{$pull:{following:req.body.userId}});
        res.status(200).json({message:"Unfollowing the user"});
    }
    else{
        return res.status(409).json({message:"Please pass the user id"});
    }
};  

exports.profiledata = async(req,res)=>{
    const result = await UserModel.aggregate(
        [
            {
                $match:{_id:req.user._id}
            },
            {
                $lookup:{
                    from: 'posts',
                    localField:'posts',
                    foreignField:'_id',
                    as:'allPosts'
                }
            }
        ]
    );
    res.status(200).json(result);
}
exports.followersData = async(req,res)=>{
    const result = await UserModel.aggregate([
        {
            $match:{_id:req.body.userId}
        },
        {
            $lookup:{
                from:'user',
                localField:'followers',
                foreignField:'_id',
                as:'followerss'
            }
        }
    ]);
    res.status(200).json(result);
}
function generateRandomToken(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}