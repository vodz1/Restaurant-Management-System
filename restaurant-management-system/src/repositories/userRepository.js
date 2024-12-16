const BaseRepository = require('./BaseRepository');
const User = require('../models/Users/user');
const {Op} = require('sequelize');


class UserRepository extends BaseRepository {

  static instance;

   constructor() {
    super(User);
    if (!UserRepository.instance) {
        UserRepository.instance = this;
    }
    return UserRepository.instance;
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email: email } });
  }

  async findUserWithCode(email, code) {
    return await this.model.findOne({
      where: {
        [Op.and]: [
          { email : email },
          { resetCode: code },
          { resetCodeExpiry: { [Op.gt]: new Date() } } 
          // Ensure comparison is done with a Date object
        ],
      },
    });
    
  }

  async findByResetToken(resetToken) {
    return await this.model.findOne({ where: { resetToken } });
  }

}

module.exports = UserRepository;