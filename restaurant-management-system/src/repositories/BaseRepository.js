class BaseRepository{
    constructor(model){
        this.model = model;
    }

    async findAll(options = {}) {
      console.log("findAll called with options:", options);
      const items = await this.model.findAll(options);
      return items;
  }
    
      async findById(id) {
        return await this.model.findByPk(id);
      }
    
      async create(data) {
        return await this.model.create(data);
      }
    
      async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error('Record not found');
        return instance.update(data);
      }
    
      async delete(id) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error('Record not found');
        return instance.destroy();
      }

      async markExpired(orderId) {
        return await this.orderRepository.update(orderId, { status: 'expired' });
      }

}
module.exports = BaseRepository
