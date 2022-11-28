const { ObjectId } = require('mongodb');
const mongoose =  require('mongoose');
const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            index:{
                unique:true
            }         
        },
        password:{
            type: String,
            required: true
        },
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        createdAt:{
            type:Date
        },
        updatedAt:{
            type:Date
        },
        forgotPasswordToken:{
            type:String
        },
        forgotPasswordTokeCreatedTime:{
            type:Date,
            default:null
        },
        oldPasswords:{
            type:[
                {
                    type:String
                }
            ]
        },
        posts:{
            type:[
                {
                    type:ObjectId
                }
            ]
        },
        profilePic:{
            type:String
        },
        savedPosts:{
            type:[
                {
                    type:ObjectId
                }
            ]
        },
        accountStatus:{
            type:String,
            default:"active"
        },
        accountSuspendReason:{
            type:String
        },
        bio:{
            type:String
        },
        username:{
            type:String
        },
        followers:{
            type:[
                {
                    type:ObjectId
                }
            ]
        },
        following:{
            type:[
                {
                    type:ObjectId
                }
            ]
        },
    },
    {
        timestamps: true
    }
);
var UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;