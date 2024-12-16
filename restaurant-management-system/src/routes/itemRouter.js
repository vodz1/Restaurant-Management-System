const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const ItemController = require("../controllers/itemController");
const ItemService = require("../services/itemService");
const itemService = new ItemService();
const itemController = new ItemController(itemService);


router.post("/", authMiddleware , adminMiddleware , (req, res) => {itemController.create(req, res)});
router.get("/",  authMiddleware , adminMiddleware ,  (req, res) => {itemController.getAll(req, res)});
router.put("/:id",  authMiddleware , adminMiddleware ,  (req, res) => {itemController.update(req, res)});
router.delete("/:id",  authMiddleware , adminMiddleware ,  (req, res) => {itemController.delete(req, res)});


module.exports = router;