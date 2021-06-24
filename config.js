const Sequelize = require('sequelize');
const config = new Sequelize('Mango','New','',{dialect: 'mysql'});

module.exports = config;