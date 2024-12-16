const BaseRepository = require('./BaseRepository');
const Order = require('../models/Orders/order.js');

 class OrderRepository extends BaseRepository {

     static instance;

    constructor() {
      super(Order);
      if (!OrderRepository.instance) {
        OrderRepository.instance = this;
    }
    return OrderRepository.instance;
    }

    async updateExpiredOrders(orderId) {
      const result = await this.model.update(
          { status: 'expired' },
          { where: { id: orderId, status: 'pending' } } // Ensure only pending orders are updated
      );
      return result; 
    }

}
  
module.exports = OrderRepository;