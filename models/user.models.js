const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:10 
    },

    lastname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:10 
    },

    email:{
        type:String,
        required:true, 
    },

    password:{
        type:String,
        required:true,
         
    },

    phoneN:{
        type:Number,
        required:true, 
    },

    address:{
        type:String,
        required:true,
    },

},{timestamps:true});



// create collection or model

const User = mongoose.model("User",userSchema)

module.exports = User;