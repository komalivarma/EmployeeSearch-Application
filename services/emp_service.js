var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var employeeModel = require('../model/employee_model');

//==========API for Insertion of Employee Records =====================

var postEmployee = async (req,res,next)=>{
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into post Employee service");

    try{
        let payLoad = req.body;
        if(payLoad != undefined)
        {
            let empData = await employeeModel.Employee.create(payLoad);
            res.status(STATUS_CODES.OK).send({
                "statusCode" : STATUS_CODES.OK,
                "info":"Employee Data inserted",
                "employees" : empData
            })
        }
    }
    catch(e)
    {
        next(e);
    }
    }

//==============API for Get All Employees ================

var getAllEmployees = async(req,res,next)=>{
 
//logger
console.log("URL hit to :",req.hostname,req.originalUrl);
logger.info("Entered into get AllEmployess Service");
    try 
    {
        let empData =  await employeeModel.Employee.findAll({
            where:{
                isDeleted:0
            }
        });
        //console.log(empData);
        res.status(STATUS_CODES.OK).send({
            "statusCode": STATUS_CODES.OK,
            "info": "List of Employees",
            "employees": empData
        })
    }
    catch (e) 
    {
        logger.error(e.message);
        
    }
    }

//This function is to get Single Employee Data based on Id

var getEmployeeById = async (req, res, next) => {
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("URL hit to :",req.hostname);
    logger.info("Entered into get Employee By ID Service");
    try 
    {
    const id = req.params.Id;
    //console.log(id);
    // if(req.body.isDeleted==1){
    //     res.send(
    //         {
    //             "statusCode": STATUS_CODES.NOT_FOUND,
    //             "info": "No such Employee Record Found"
               
    //         }
    //     )
    // }
    let empData = await employeeModel.Employee.findOne({
    where: {
        isDeleted:0,
         Id: id
    }
   
    })
    //console.log(empData);
    //res.send(empData);
    res.status(STATUS_CODES.OK).send({
    "statusCode": STATUS_CODES.OK,
    "info": "Successfully Retrieved Employee Data",
    "employee": empData
    })
     }
    catch(e){
    return next(e);

    }

    }

    // var deleteEmployee = async (req, res, next) => {
    //     console.log("URL hit to :",req.hostname,req.originalUrl);
    //     //logger.info("URL hit to :",req.hostname);
    //     logger.info("Entered into update Employee Service");
    //     try 
    //     {
    //         const id = req.params.Id;
    //         console.log(id);
    //         let empData = await employeeModel.Employee.update({
    //             "isDeleted": 1
    //         },
            
    //         {
    //             where: {
    //                   Id: id
    //                 }
    //         })
    //         res.send(empData);
    //         // res.status(STATUS_CODES.OK).send({
    //         // "statusCode": STATUS_CODES.OK,
    //         // "info": "Successfully Deleted Employee Data",
            
    //         // })
    //     }
    //     catch(e){
    //         return next(e);
    //     }
    // }


    // var updateEmployee = async (req, res, next) => {
    //     console.log("URL hit to :",req.hostname,req.originalUrl);
    //     //logger.info("URL hit to :",req.hostname);
    //     logger.info("Entered into update Employee Service");
    //     try 
    //     {
    //         const id = req.params.Id;
    //         console.log(id);
    //         let empData = await employeeModel.Employee.update({
    //             "isDeleted": 1
    //         },
            
    //         {
    //             where: {
    //                   Id: id
    //                 }
    //         })
    //         res.send(empData);
    //         // res.status(STATUS_CODES.OK).send({
    //         // "statusCode": STATUS_CODES.OK,
    //         // "info": "Successfully updatedEmployee Data",
            
    //         // })
    //     }
    //     catch(e){
    //         return next(e);
    //     }
    // }


module.exports={
    postEmployee:postEmployee,
    getAllEmployees1:getAllEmployees,
    getEmployeeById:getEmployeeById,
    // updateEmployee:updateEmployee,
    // deleteEmployee:deleteEmployee  

}