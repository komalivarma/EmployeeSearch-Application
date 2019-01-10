const sequelize = require('sequelize');
var sqlConnection = require('../database/connection');

//Model Schemaa for Login Table
var LoginEmp = sqlConnection.define('login', {
    id: { type: sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    username: sequelize.STRING,
    password: sequelize.STRING
	
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'login'
    });



module.exports = {

    LoginEmp: LoginEmp

};