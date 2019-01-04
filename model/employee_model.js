const sequelize = require('sequelize');
var sqlConnection = require('../database/connection');

//Model Schemaa for Employee Table
var Employee = sqlConnection.define('employee', {
    Id: { type: sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    FirstName: sequelize.STRING,
    LastName: sequelize.STRING,
	Email: sequelize.STRING,
	Phone: sequelize.STRING,
	City: sequelize.STRING,
    Gender: sequelize.STRING,
	Dept: sequelize.STRING,
    HireDate: sequelize.DATE,
    isDeleted:sequelize.BIGINT
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'employee'
    });



module.exports = {

    Employee: Employee

};