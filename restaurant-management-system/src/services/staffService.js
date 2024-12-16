const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StaffRepository = require("../repositories/staffRepository");
const staffValidator = require("../utils/staffValidator");

class StaffService {
  constructor() {
    this.staffRepository = new StaffRepository();
  }

  async register(staffData) {
    const valid = staffValidator(staffData);
    if(!valid){
        return res.status(400).json({ message: staffValidator.errors });
    }
    const staffExists = await this.staffRepository.findByEmail(staffData.email);
    if (staffExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(staffData.password, 10);
        staffData.password = hashedPassword
        staffData.email = staffData.email.toLowerCase();
    return await this.staffRepository.create(staffData);
  }

  async login(email, password) {
    const staff = await this.staffRepository.findByEmail(email);
    if (!staff) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id : staff.id , role:"staff" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return { staff , token };
  }

  async getAllStaff() {
    return await this.staffRepository.findAll();
  }

//   async getAdminById(id) {
//     return await this.staffRepository.findById(id);
//   }

}

module.exports = StaffService;
