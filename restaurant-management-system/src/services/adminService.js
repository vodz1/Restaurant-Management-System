const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminRepository = require("../repositories/adminRepository");
const OrderRepository = require("../repositories/orderRepository");
const adminValidator = require("../utils/adminValidator");

class AdminService {
  constructor() {
    this.adminRepository = new AdminRepository();
    this.orderRepository = new OrderRepository();
  }

  async register(adminData) {
    const valid = adminValidator(adminData);
    if(!valid){
        return res.status(400).json({ message: orderValidator.errors });
    }
    const adminExists = await this.adminRepository.findByEmail(adminData.email);
    if (adminExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword
    adminData.email = adminData.email.toLowerCase();
    return await this.adminRepository.create(adminData);
  }

  async login(email, password) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id : admin.id , role:"admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return { admin , token };
  }




  // async getAllAdmins() {
  //   return await this.adminRepository.findAll();
  // }

  
//   async getAdminById(id) {
//     return await this.adminRepository.findById(id);
//   }

}

module.exports = AdminService;
