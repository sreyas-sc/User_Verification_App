const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    email_verify:{
        type:Boolean
    },
    phone:{
        type:String,
        required:true
    },
    phone_verify:{
        type:Boolean
    },
    aadhar:{
        type:String,
        required:true
    },
    aadhar_verify:{
        type:Boolean
    },
    pan:{
        type:String,
        required:false,
        default:""
    },
    pan_verify:{
        type:Boolean,
        default:false    
    },
    gst:{
        type:String,
        required:false,
        default:""

    },
    gst_verify:{
        type:Boolean,
        default:false
    },
    dob:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const users = mongoose.model('users',userSchema)
module.exports = users