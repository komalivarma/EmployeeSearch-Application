const express = require('express');
const router = express.Router();
var logger = require('../util/logger');
const joi=require('express-joi-validator');
const schema = require('../schema/emp_schema');
const service = require('../services/emp_service');

router.post('/insertEmployee',joi(schema.empSchema),service.postEmployee);
router.get('/getAllEmployees',service.getAllEmployees1);
router.get('/getEmployeeById/:Id',service.getEmployeeById);
 router.put('/updateEmployee/:Id',joi(schema.empSchema), service.updateEmployee);
 router.delete('/deleteemployee/:id',service.deleteEmployee);
module.exports = router;
