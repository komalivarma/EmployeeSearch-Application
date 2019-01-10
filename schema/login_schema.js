var joi = require('joi');

var loginSchema ={
    body:{
    username:joi.string().required(),
    Password:joi.string().required()
   
    }
}

module.exports={
    loginSchema:loginSchema
}