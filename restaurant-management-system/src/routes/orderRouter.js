const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const staffMiddleware = require("../middlewares/staffMiddleware");

const OrderController = require("../controllers/orderController");
const OrderService = require("../services/orderService");
const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.get("/",  authMiddleware , adminMiddleware ,  (req, res) => {orderController.viewOrders(req, res)});
router.post("/", authMiddleware  , (req, res) => {orderController.createOrder(req, res)});
router.post("/add",  authMiddleware , staffMiddleware ,  (req, res) => {orderController.addItem(req, res)});
router.delete("/remove",  authMiddleware , staffMiddleware ,  (req, res) => {orderController.removeItem(req, res)});
router.put("/complete/:orderId",  authMiddleware , staffMiddleware ,  (req, res) => {orderController.markComplete(req, res)});

module.exports = router;