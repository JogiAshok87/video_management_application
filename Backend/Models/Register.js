const mongoose = require('mongoose')


const registerSchema = mongoose.Schema({
    name :{
        type:String,
        required:true,
        min : 10
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    confirmPassword:{
        type:String,
        required: true
    }
    
})

module.exports = mongoose.model('Register',registerSchema)