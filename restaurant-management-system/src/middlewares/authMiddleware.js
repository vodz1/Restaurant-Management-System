require('dotenv').config();

const jwt = require("jsonwebtoken");
const adminRepository = new (require("../repositories/adminRepository"))();
const staffRepository = new (require("../repositories/staffRepository"))();
const userRepository = new (require("../repositories/userRepository"))();


const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log("Decoded token:", decoded);

      if (decoded.role == "admin") {
        console.log("Finding admin with ID:", decoded.id);
        req.user = await adminRepository.findById(decoded.id);
        req.user.role = "admin";
        console.log("Found admin:", req.user);
      } else if (decoded.role == "staff") {
        req.user = await staffRepository.findById(decoded.id);
        req.user.role = "staff";

      } else if (decoded.role == "user") {
        req.user = await userRepository.findById(decoded.id);
        req.user.role = "user";

      }

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      console.error("Error verifying token or finding user:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = authMiddleware;
