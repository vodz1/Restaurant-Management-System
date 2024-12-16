const express = require("express");
const router = express.Router();

const StaffController = require("../controllers/staffController");
const StaffService = require("../services/staffService");
const staffService = new StaffService();
const staffController = new StaffController(staffService);


router.post("/register", (req, res) => staffController.register(req, res));
router.post("/login", (req, res) => staffController.login(req, res));

module.exports = router;