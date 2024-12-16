const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserRepository = require("../repositories/userRepository");
const userValidator = require("../utils/userValidator");


class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData) {
    const valid = userValidator(userData);  
    if(!valid){
        return res.status(400).json({ message: userValidator.errors });
    }
    const userExists = await this.userRepository.findByEmail(userData.email);
    if (userExists) {
      throw new Error("Email already exists");
    }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword
            userData.email = userData.email.toLowerCase();
    return await this.userRepository.create(userData);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id : user.id , role : "user" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return { user , token };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async forgetPassword(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate reset code and expiry
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const resetCodeExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Save reset code and expiry
    await this.userRepository.update(user.id, { resetCode, resetCodeExpiry });

    // Send reset code via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);
    return { message: "Reset code sent to your email." };
  }

  async verifyResetCode(email, code) {
    const user = await this.userRepository.findUserWithCode(email , code);
    console.log("user" , user);
    

    if (!user || user.resetCode !== code || user.resetCodeExpiry < new Date()) {
      throw new Error("Invalid or expired reset code");
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    await this.userRepository.update(user.id, {
      resetCode: null,
      resetCodeExpiry: null,
      resetToken,
    });

    return { resetToken };
  }

  async resetPassword(resetToken, newPassword) {
    const user = await this.userRepository.findByResetToken(resetToken);
    if (!user) {
      throw new Error("Invalid reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(user.id, {
      password: hashedPassword,
      resetToken: null,
    });

    return { message: "Password updated successfully" };
  }

//   async getAdminById(id) {
//     return await this.userRepository.findById(id);
//   }

}

module.exports = UserService;
