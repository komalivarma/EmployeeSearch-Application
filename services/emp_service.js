var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var employeeModel = require('../model/employee_model');

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
            
            next(e);
            
        }
        }

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

    //==============API for Update Employees By ID ================

    var updateEmployee = async (req, res, next) => {
    console.log("URL hit to :",req.hostname,req.originalUrl);
    //logger.info("URL hit to :",req.hostname);
    logger.info("Entered into update Employee Service");
    try 
    {
        const id = req.params.Id;
        //console.log(id);
        let empData1 = await employeeModel.Employee.findAll(
            {
                
                where: {
                   //"Id": id,
                      Id:id,
                      
                    }
            })
            if(empData1.length!=0)
            {
                if(empData1[0].isDeleted!=1)

            
                {
                    let empData = await employeeModel.Employee.update(req.body,
                        {
                            
                            where: {
                               //"Id": id,
                                  Id:id,
                                  isDeleted:0
                                }
                        }).then(()=>{
                        //res.send(empData);
                        res.status(STATUS_CODES.OK).send({
                        "statusCode": STATUS_CODES.OK,
                        "info": "Successfully updatedEmployee Data"
                         })
                        }).catch(err=>{
                            next(err)
                        });
                    
                }
                else{
                    res.send("Sorry! The Employee was not Existed ");
                }

            }
        else{
            res.status(STATUS_CODES.BAD_REQUEST).send({
                "statusCode": STATUS_CODES.BAD_REQUEST,
                "info": "Bad Request. Entered Id was Not found"
                 })
        }
    }
    catch(e){
        return next(e);
    }
}

//==============API for Delete Employee ================

var deleteEmployee =  async (req,res,next)=>{

    console.log("URl hit to",req.hostname,req.originalUrl);
    logger.info("Entered into delete Employee information by id service");

    try {
        var Id = req.params.Id;
        var Data = await employeeModel.Employee.findAll({
        where:
        {
            "Id":Id
        }
        });
        //var data = deleteData;
        if (Data.length!= 0) {
            if(Data[0].isDeleted!=1){
                let empData = await employeeModel.Employee.update({isDeleted : 1},{where:{id:req.params.Id}});
                res.status(STATUS_CODES.OK).send({
                    "statuscode": STATUS_CODES.OK,
                    "info": "Successfully Deleted"
                })
            }
            else{
                res.status(STATUS_CODES.BAD_REQUEST).send({
                    "statuscode": STATUS_CODES.BAD_REQUEST,
                    "info": "user doesn't exist"
                })
            }
        }
        else 
        {
        res.status(STATUS_CODES.NOT_FOUND).send({
        "statusCode" : STATUS_CODES.NOT_FOUND,
        "info" : "ID Not Found. Please look for Valid ID"
        })
        }
        }
        catch(e)
        {
            logger.error(e.message);
            //console.log(e);
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
    let empData = await employeeModel.Employee.findOne({
    where: {
        isDeleted:0,
         Id: id
    }
   
    })
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

    
module.exports={
    postEmployee:postEmployee,
    getAllEmployees1:getAllEmployees,
    getEmployeeById:getEmployeeById,
    updateEmployee:updateEmployee,
    deleteEmployee:deleteEmployee  

}