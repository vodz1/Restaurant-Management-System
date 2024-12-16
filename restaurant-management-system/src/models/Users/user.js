const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const User = sequelize.define('Users', {
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
    },
    resetCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetCodeExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
});

module.exports = User;