const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const Orders = sequelize.define('Orders', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status : {
        type: DataTypes.ENUM('pending', 'completed' , 'expired'),
        defaultValue: 'pending'
    },
    createdAt : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    staffId: { type: DataTypes.INTEGER, references: { model: 'Staffs', key: 'id' } },
    userId: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },


});

module.exports = Orders;