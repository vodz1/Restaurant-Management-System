// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const adminRepository = require("../repositories/adminRepository");
// const staffRepository = require("../repositories/staffRepository");

// class AuthService {
//   async login(email, password) {
//     let user, role;

//     // Check in Parent Repository
//     user = await adminRepository.findByEmail(email);
//     if (user) {
//       role = "parent";
//     }

//     // Check in Nursery Admin Repository
//     if (!user) {
//       user = await NurseryAdminRepository.findByEmail(email);
//       if (user) {
//         role = "nurseryAdmin";
//       }
//     }

//     // Check in System Admin Repository
//     if (!user) {
//       user = await SystemAdminRepository.findByEmail(email);
//       if (user) {
//         role = "systemAdmin";
//       }
//     }

//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid email or password");
//     }

//     console.log(`Assigning role: ${role} to token`);

//     const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     return { user, token };
//   }
// }

// module.exports = new AuthService();
