const Admin = require('../Users/admin.js'); // Adjust path as needed
const Staff = require('../Users/staff.js');
const User = require('../Users/user.js');
const Items = require('../Menuitem/menuItems.js');
const Order = require('../Orders/order.js');
const OrderItem = require('../Order-item/orderItem.js');

// Admin and MenuItem
Admin.hasMany(Items, { foreignKey: 'adminId' });
Items.belongsTo(Admin, { foreignKey: 'adminId' });

// Staff and Orders
Staff.hasMany(Order, { foreignKey: 'staffId' });
Order.belongsTo(Staff, { foreignKey: 'staffId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Items, { through: OrderItem, foreignKey: 'orderId' });
Items.belongsToMany(Order, { through: OrderItem, foreignKey: 'itemId' });




module.exports = { Admin, Staff, User, Items, Order, OrderItem };
