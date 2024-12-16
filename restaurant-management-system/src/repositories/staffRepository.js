const BaseRepository = require('./BaseRepository');
const Staff = require('../models/Users/staff');


class StaffRepository extends BaseRepository {

     static instance;

   constructor() {
    super(Staff);
    if (!StaffRepository.instance) {
      StaffRepository.instance = this;
  }
  return StaffRepository.instance;
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email: email } });
  }

  async getAvailableStaff() {
    const staffMembers = await this.model.findAll();
    // Use round-robin or random logic
    const randomIndex = Math.floor(Math.random() * staffMembers.length);
    return staffMembers[randomIndex];
  }

}

module.exports = StaffRepository;