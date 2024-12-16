const OrderRepository = require('../repositories/orderRepository');
const StaffRepository = require('../repositories/staffRepository'); 
const OrderItemRepository = require('../repositories/orderitemRepository');
const ItemRepository = require('../repositories/itemRepository');
const amqp = require('amqplib');
const moment = require('moment-timezone');


 class OrderService {

    constructor() {
        this.orderRepository = new OrderRepository()
        this.staffRepository = new StaffRepository()
        this.orderItemRepository = new OrderItemRepository()  
        this.itemRepository = new ItemRepository();
        this.channel = null;
        this.initializeRabbitMQ()
    }

    async getAllOrders() {
      return await this.orderRepository.findAll();
    }

    async getOrderDetails(orderId) {
      return await this.orderRepository.findById(orderId);
    }
  
    async createOrder(userId, items) {
      const availableStaff = await this.staffRepository.getAvailableStaff();
      if (!availableStaff) throw new Error('No available staff');
  
      // Check if all items exist first
      for (const item of items) {
          const existingItem = await this.itemRepository.findById(item.itemId);
          if (!existingItem) {
              throw new Error(`Item with ID ${item.itemId} not found.`);
          }
      }
  
      // Assign order to staff (Round Robin/Random)
      const staffId = availableStaff.id;
  
      // Create order after validating all items
      const order = await this.orderRepository.create({
          userId,
          staffId,
          status: 'pending',
      });
  
      // Add valid items to the order
      for (const item of items) {
          await this.orderItemRepository.addItem(order.id, item.itemId, item.quantity);
      }
  
      // Publish order expiry message
      await this.publishOrderExpiry(order.id);
      return order;
  }
  

    async addItem(orderId, itemId, quantity) {
      const order = await this.orderRepository.findById(orderId);
      const item = await this.itemRepository.findById(itemId);
      if (!order) throw new Error('Order not found');
      if (!item) throw new Error('Item not found');
      if (order.status !== 'pending') throw new Error('Cannot modify completed/expired order');
  
      return await this.orderItemRepository.addItem(orderId, itemId, quantity);
    }

    async removeItem(orderId, itemId) {
      const order = await this.orderRepository.findById(orderId);
      const item = await this.itemRepository.findById(itemId);
      if (!order) throw new Error('Order not found');
      if (!item) throw new Error('Item not found');
      if (order.status !== 'pending') throw new Error('Cannot modify completed/expired order');
  
       await this.orderItemRepository.removeItem(orderId, itemId);

       const remainingItems = await this.orderItemRepository.getItemIdsByOrderId(orderId);

       // If no items are left, delete the order as well
       if (remainingItems.length === 0) {
         await this.orderRepository.delete(orderId);
         console.log(`Order ID ${orderId} has been deleted because it has no remaining items.`);
       }


    }


    async markComplete(orderId) {
      const order = await this.orderRepository.findById(orderId);
      if (!order || order.status !== 'pending') throw new Error('Invalid order status');
      
      return await this.orderRepository.update(orderId, { status: 'completed' });
    }
  
    async initializeRabbitMQ() {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('order-expiry');
  }



  async publishOrderExpiry(orderId) {
      if (!this.channel) throw new Error('RabbitMQ channel not initialized');
      this.channel.publish(
        'delayed-exchange', // Exchange name
        'order-routing-key', // Routing key
        Buffer.from(JSON.stringify({ orderId })), // Message body
        {
            headers: { 'x-delay': 4 * 60 * 60 * 1000 }, // Delay in milliseconds (4 hours)
            persistent: true // Make the message persistent
        }
    );
      console.log(`Order expiry message published for Order ID: ${orderId}`);
  }
    
  async markExpiredOrders(orderId) {
    if (!orderId) {
        throw new Error("Order ID is required to mark an order as expired.");
    }

    // Fetch the order by ID
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error(`Order with ID ${orderId} not found`);
    if (order.status === 'expired') {
      console.log(`Order with ID ${orderId} is already expired.`);
      return;
    }

    // Check if the order was created more than 1 minute ago
    const currentTime = moment().tz('Europe/Paris'); // Get the current time in the correct timezone
    const orderCreationTime = moment(order.createdAt).tz('Europe/Paris'); // Parse the order creation time and set the correct timezone

    const expiryTime = orderCreationTime.clone().add(1, 'minute'); // Add 1 minute to the creation time

    console.log(`Current Time: ${currentTime.format()}`);
    console.log(`Order Creation Time: ${orderCreationTime.format()}`);
    console.log(`Expiry Time: ${expiryTime.format()}`);

    // Check if the order is expired
    if (currentTime >= expiryTime) {
        console.log(`Order with ID ${orderId} has expired, updating database.`);
        const result = await this.orderRepository.updateExpiredOrders(orderId);
        console.log(`Database update result: ${result}`);
        return result;
    } else {
        console.log(`Order with ID ${orderId} is still valid.`);
    }}


  }
  module.exports = OrderService;
  
  