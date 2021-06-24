const Sequelize = require('sequelize');
const config = require('../config');

const Employee = config.define('Employee',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type:Sequelize.STRING,
        allowNull: false
    },
    salary:{
        type:Sequelize.FLOAT,
        allowNull: false
    },
    department_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
},{timestamps: false}); //Eliminates the default columns added by Sequelize

module.exports = Employee;