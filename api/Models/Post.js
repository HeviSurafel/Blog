const { Schema } = require('mongoose');
const  mongoose = require('mongoose');
const Post=mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    summery:{
        type:String,
        required:[true,'summery is required']
    },
   
    content:{
        type:String,
        required:[true,'content is required']
    },
    cover:{
        type:String,
        required:[true,'image is required']
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },

},{
    timestamps:true
})
module.exports=mongoose.model('post',Post)

