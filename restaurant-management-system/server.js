const express = require('express');
const sequelize = require('./src/config/db'); // Adjust the path as needed
const dotenv = require('dotenv');
const adminRouter = require('./src/routes/adminRouter');
const staffRouter = require('./src/routes/staffRouter');
const userRouter = require('./src/routes/userRouter');
const orderRouter = require('./src/routes/orderRouter');
const itemRouter = require('./src/routes/itemRouter');
const { processExpiryQueue } = require('./src/services/queueProcessor');  // Import the queue processor
require('./src/models/Relations/index')
const errorHandler = require('./src/middlewares/errorHandlerMiddleware'); 
dotenv.config();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const connectDB = async () => {
    try {
      // Test connection
      await sequelize.authenticate();
      console.log('Database connected successfully.');
  
      // Sync database (only for development; remove `force: true` for production)
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully.');

      await processExpiryQueue();
      console.log('Expiry queue processing started.');
  
      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1); // Exit the application on DB connection failure
    }
};

connectDB();

app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/items', itemRouter);  
app.use(errorHandler);   
module.exports = app;

