const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db.js')

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, references: { model: 'Orders', key: 'id' } },
    itemId: { type: DataTypes.INTEGER, references: { model: 'Items', key: 'id' } },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
});
  

module.exports = OrderItem;