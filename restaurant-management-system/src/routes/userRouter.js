const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const userService = new UserService();
const userController = new UserController(userService);


router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post('/forget-password', (req ,res) => userController.forgetPassword(req , res));
router.post('/verify-code', (req ,res) => userController.verifyCode(req , res));
router.post('/reset-password',(req ,res) =>  userController.resetPassword(req , res));

module.exports = router;