const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const Admin = sequelize.define('Admins', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        unique: true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Admin;