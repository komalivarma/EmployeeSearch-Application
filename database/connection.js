var logger = require('../util/logger');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var connection = new Sequelize('crud', 'root', 'root',{
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: Op, // use Sequelize.Op.
    logging: false,
});

connection.authenticate()
  .then(function () {
    //console.log("MariaDB Connection Established");//logger
    logger.info("SQL Connection Established ");
  })
  .catch(function (err) {
    //console.log("Error Connecting to Database" + JSON.stringify(err));//logger
    logger.info("Error connecting to Database");
  })
  .done();


module.exports = connection;