const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");
const AdminService = require("../services/adminService");
const adminService = new AdminService();
const adminController = new AdminController(adminService);


router.post("/register", (req, res) => {adminController.register(req, res)});
router.post("/login", (req, res) => {adminController.login(req, res)});

module.exports = router;