const BaseRepository = require('./BaseRepository');
const Admin = require('../models/Users/admin');




class AdminRepository extends BaseRepository {

  static instance;

   constructor() {
    super(Admin);
    if (!AdminRepository.instance) {
      AdminRepository.instance = this
    }
    return AdminRepository.instance;
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email: email } });
  }

}

module.exports = AdminRepository;