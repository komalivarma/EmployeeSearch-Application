var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var employeeModel = require('../model/employee_model');

//==========API for Insertion of Employee Records =====================

var postEmployee = async (req,res,next)=>{
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into post Employee service");

    try{
        let request = req.body;
        if(request != undefined)
        {
            let empData = await employeeModel.Employee.create(request);
            res.status(STATUS_CODES.OK).send({
                "statusCode" : STATUS_CODES.OK,
                "info":"Successfully Inserted Employee Data",
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

//==============API for Get Employee By ID ================

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
    if(empData !=undefined){
    res.status(STATUS_CODES.OK).send({
    "statusCode": STATUS_CODES.OK,
    "info": "Successfully Retrieved Employee Data",
    "employee": empData
    })
}
 else
 {
    res.status(STATUS_CODES. NOT_FOUND).send({
        "statusCode": STATUS_CODES. NOT_FOUND,
        "info": "Employee Id Not Found",
        "employee": empData
        })
 }
     }
    catch(e){
    return next(e);

    }

    }



    
//==============API for Update Employees By ID ================
var updateEmployee = async (req, res, next) => {
    console.log("URL hit to :",req.hostname,req.originalUrl);
    //logger.info("URL hit to :",req.hostname);
    logger.info("Entered into update Employee Service");
    try 
    {
        const id = req.params.Id;
        console.log(id);
        let empData = await employeeModel.Employee.update(req.body,
        {
            
            where: {
               //"Id": id,
                  Id:id,
                  isDeleted:0
                }
        })
        //res.send(empData);
        res.status(STATUS_CODES.OK).send({
        "statusCode": STATUS_CODES.OK,
        "info": "Successfully updatedEmployee Data"
         })
        console.log(empData);
    }
    catch(e){
        return next(e);
    }
}

//==============API for Delete Employee ================

    var deleteEmployee =  async (req,res,next)=>{

        console.log("URl hit to",req.hostname,req.originalUrl);
        logger.info("Entered into delete Employee information by id service");
    
        try{
            //var empId = req.params.id;
            let empData = await employeeModel.Employee.update({isDeleted : 1},{where:{id:req.params.id}});
            if(empData!=undefined)
            {
                res.status(STATUS_CODES.OK).send({
                    "statuscode":STATUS_CODES.OK,
                    "info":"Successfully Deleted",
                    "employees":empData
                })
            }
            else
            {
                res.status(STATUS_CODES.NOT_FOUND).send({
                    "statuscode":STATUS_CODES.NOT_FOUND,
                    "info":"List of employees",
                    "employees":empData
                })
            }
        }
        catch(e)
        {
            logger.error(e.message);
            //console.log(e);
        }
    }



module.exports={
    postEmployee:postEmployee,
    getAllEmployees1:getAllEmployees,
    getEmployeeById:getEmployeeById,
    updateEmployee:updateEmployee,
    deleteEmployee:deleteEmployee  

}