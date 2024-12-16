const amqp = require('amqplib');
const OrderService = require('./orderService');

// Queue processor function

async function processExpiryQueue() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'order-expiry';

        await channel.assertExchange('delayed-exchange', 'x-delayed-message', {
            durable: true,
            arguments: { 'x-delayed-type': 'direct' },
        });

        await channel.assertQueue(queue, { durable: true });
        channel.bindQueue(queue , 'delayed-exchange', 'order-routing-key');

        console.log(`Waiting for messages in queue: ${queue}`);

        // Consume the message from the queue
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    const { orderId } = JSON.parse(msg.content.toString());
                        console.log(`Processing expired order for Order ID: ${orderId}`);
                        const orderService = new OrderService();
                        await orderService.markExpiredOrders(orderId);

                        // Acknowledge the message after processing
                        channel.ack(msg);
                } catch (error) {
                    console.error(`Failed to process message: ${error.message}`);
                    // Reject the message and don't requeue it
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error(`Failed to connect or consume from RabbitMQ: ${error.message}`);
    }
}

// Export the processor for external use
module.exports = { processExpiryQueue };
