class OrderController {
    constructor(orderService) {
      this.orderService = orderService;
    }
  
    async viewOrders(req, res) {
      try {
        const orders = await this.orderService.getAllOrders();
        res.status(200).json(orders);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }



    async createOrder(req, res) {
      try {
        const { items } = req.body;
        const userId = req.user.id; // Assume user is authenticated
        const order = await this.orderService.createOrder(userId, items);
        res.status(201).json(order);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async addItem(req, res) {
      try {
        const { orderId, itemId, quantity } = req.body;
        const result = await this.orderService.addItem(orderId, itemId, quantity);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async removeItem(req, res) {
      try {
        const { orderId, itemId } = req.body;
        const result = await this.orderService.removeItem(orderId, itemId);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async markComplete(req, res) {
      try {
        const { orderId } = req.params;
        const result = await this.orderService.markComplete(orderId);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  
 
  }
  
  module.exports = OrderController;
  