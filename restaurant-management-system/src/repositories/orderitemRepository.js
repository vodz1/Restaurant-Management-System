const BaseRepository = require('./BaseRepository');
const OrderItem = require('../models/Order-item/orderItem');

class OrderItemRepository extends BaseRepository {
     static instance;

    // Private constructor to prevent direct instantiation
     constructor() {
        super(OrderItem); // Call the constructor of the BaseRepository, if needed
        if (!OrderItemRepository.instance) {
            OrderItemRepository.instance = this
        }
        return OrderItemRepository.instance;
    }

    async addItem(orderId, itemId, quantity) {
        return await this.model.create({
          orderId,
          itemId,
          quantity,
        });
      }


      async removeItem(orderId, itemId) {
        const orderItem = await this.model.findOne({
          where: { orderId, itemId },
        });
        if (!orderItem) throw new Error('Order item not found');
    
        return await orderItem.destroy();
      }

      async getItemIdsByOrderId(orderId) {
        try {
          // Assuming OrderItem table has fields `orderId` and `itemId`
          const orderItems = await this.model.findAll({
            where: { orderId }, // Find all items for the given orderId
          });
    
          // Extract itemIds from the result
          const itemIds = orderItems.map(item => item.itemId);
          return itemIds; // Return an array of itemIds
        } catch (error) {
          throw new Error('Error fetching items for order: ' + error.message);
        }
      }

}   
module.exports = OrderItemRepository;