const userModel = require('../models/userModel');

const dotenv = require('dotenv');
const { ObjectID } = require('mongoose');
dotenv.config();

exports.protects = async(req,res,next)=>{
    if(req.query.userId){
        const user = await userModel.findById(req.query.userId);
        if(user){
            req.user = user;
            next();
        }
        else{
            res.status(409).json({message:"User not found."})
        }
    }
    else{
        res.status(409).json({message:"Please login to access this feature."})
    }
}