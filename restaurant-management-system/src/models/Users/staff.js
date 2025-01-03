const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const Staff = sequelize.define('Staffs', {
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
        allowNull: false
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Staff;