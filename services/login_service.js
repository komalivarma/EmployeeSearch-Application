var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var loginModel = require('../model/login_model');

var getLogincheck = async(req,res,next)=>{

    //logger
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into get AllEmployess Service");
    try 
    {
    
    let loginData = await loginModel.LoginEmp.findOne({
    where:{
    username:req.body.username,
    password: req.body.password
    }
    
    });
    
    var data1 = loginData;

    if(data1){
    res.status(STATUS_CODES.OK).send({
    "statusCode": STATUS_CODES.OK,
    "info": "Successfull Login",
    "data": data1
    })
    
    }
    else
    {
    res.status(STATUS_CODES.BAD_REQUEST).send({
    "statusCode": STATUS_CODES.BAD_REQUEST,
    "info": " Username or Password Incorrect "
    })
    
    }
    }
    catch (e) 
    {
    
    next(e);
    
    }
    }
    
    module.exports={
   
    getLogincheck:getLogincheck
    }
    