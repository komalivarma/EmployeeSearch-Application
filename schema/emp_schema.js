var joi = require('joi');

var empSchema ={
    body:{
    //id:joi.string.required(),
    FirstName:joi.string().required(),
    LastName:joi.string().required(),
    Email:joi.string().required().email({ minDomainAtoms: 2 }),
    Phone:joi.number().required(),
    City:joi.string().required(),
    Gender:joi.string().required(),
    Dept:joi.string().required(),
    HireDate:joi.string().required(),
    isDeleted:joi.number()
    }
}

module.exports={
    empSchema:empSchema
}