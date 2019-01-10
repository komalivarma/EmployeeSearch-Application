var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var loginModel = require('../model/login_model');

// var getLoginInfo = async(req,res,next)=>{
 
//     //logger
//     console.log("URL hit to :",req.hostname,req.originalUrl);
//     logger.info("Entered into get AllEmployess Service");
//         try 
//         {
//             //var payload = req.body;
//             let loginData =  await loginModel.LoginEmp.findAll();
//             //console.log(empData);
//             res.status(STATUS_CODES.OK).send({
//                 "statusCode": STATUS_CODES.OK,
//                 "info": "List of Logins",
//                 "login": loginData
//             })
//         }
//         catch (e) 
//         {
            
//             next(e);
            
//         }
//         }
    


// //     module.exports={
// //         getLoginInfo:getLoginInfo
// //     }
var getLogincheck = async(req,res,next)=>{
 
    //logger
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into get AllEmployess Service");
        try 
        {
            //var payload = req.body;
            let loginData =  await loginModel.LoginEmp.findOne({
                where:{
                username:req.params.username,
                password: req.params.password
                }

            });
            //console.log(empData);
            var data1 = loginData;
            if(data1){
                res.status(STATUS_CODES.OK).send({
                        "statusCode": STATUS_CODES.OK,
                        "info": " Successfull Login ",
                        "data": data1
                    })
                //res.send(data1);
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


        var postLogin = async (req,res,next)=>{
            console.log("URL hit to :",req.hostname,req.originalUrl);
            logger.info("Entered into post Employee service");
        
            try{
                let username = req.params.username;
                let password = req.params.password;
               
                
                    let loginData = await loginModel.LoginEmp.create({
                        where:{
                            "username":username,
                            "password":password
                        }
                    });
                    var data1 = loginData;
                    console.log(data1[0]);
                    console.log(data1[1]);
                    res.status(STATUS_CODES.OK).send({
                        "statusCode" : STATUS_CODES.OK,
                        "info":"Successfully Inserted Employee Data",
                        "employees" : empData
                    })
                }
               
                
            
            catch(e)
            {
                next(e);
            }
            }
    
        module.exports={
        // getLoginInfo:getLoginInfo,
        getLogincheck:getLogincheck,
        postLogin:postLogin
    }