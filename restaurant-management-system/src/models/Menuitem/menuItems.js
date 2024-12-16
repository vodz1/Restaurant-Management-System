const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const Items = sequelize.define('Items', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price : {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category : {
        type: DataTypes.STRING,
        allowNull: false
    },
    adminId: { type: DataTypes.INTEGER, references: { model: 'Admins', key: 'id' } }


});

module.exports = Items;