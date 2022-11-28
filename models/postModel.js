const { ObjectId } = require('mongodb');
const mongoose =  require('mongoose');

const postSchema = mongoose.Schema(
    {
        content:{
            type:String
        },
        images:{
            type:[
                {
                    type:String
                }
            ]
        },
        videos:{
            type:[
                {
                    type:String
                }
            ]
        },
        userId:{
            type:ObjectId,
            required: true
        },
        recommended:{
            type:Boolean,
            required: true
        },
        rating:{
            type:Number,
            required: true
        },
        reports:{
            type:[
                {
                    content:{
                        type:String
                    },
                    userId:{
                        type:ObjectId
                    }
                }
            ]
        },
        saved:{
            type:[
                {
                    type:ObjectId
                }
            ]
        },
        reactions:{
            type:[
                {
                    reactionType:{
                        type:String,
                        enum:['saviour','helpful','love','sad']
                    },
                    userId:{
                        type: ObjectId
                    }
                }
            ]
        },
        reviews:{
            type:[
                {
                    content:{
                        type:String
                    },
                    userId:{
                        type:ObjectId
                    }
                }
            ]
        }
    },
    {
        timestamps: true
    }
);
var PostModel = mongoose.model("post",postSchema);
module.exports = PostModel;