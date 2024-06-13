const mongoose=require('mongoose')
const user=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        min:4,
        required:[true,"username is required!"]
    },
    password:{
        type:String,
        required:[true,"password is required!"]
    }
},{
    timeStamp:true
})
module.exports=mongoose.model('User',user)