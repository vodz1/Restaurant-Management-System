 const ItemRepository = require('../repositories/itemRepository');
const itemValidator = require('../utils/itemValidator');
 class ItemService {

    constructor() {
        this.itemRepository =  new ItemRepository();
    }

 
    async createMenuItem(itemData , adminId) {
      const valid = itemValidator(itemData);
      if(!valid){
        return res.status(400).json({ message: itemValidator.errors });
      }
      return await this.itemRepository.createItem(itemData , adminId);
    }
  
    async getMenuItems(category , sortByPrice) {
      if (category) {
        return await this.itemRepository.filterByCategoryAndSort(category, sortByPrice);
      }
       const items = await this.itemRepository.findAll();
       console.log("items" , items)
       return items
    }
  
    async updateMenuItem(id, updateData, adminId) {
      // First, check if the item exists
      const item = await this.itemRepository.findById(id);
      if (!item) throw new Error('Item not found');
  
      // Check if the logged-in admin is the one who created the item (optional but recommended)
      if (item.adminId !== adminId) {
        throw new Error('Unauthorized to update this item');
      }

      const valid = itemValidator(updateData);
      if(!valid){
        return res.status(400).json({ message: itemValidator.errors });
      }
      // Proceed with the update, passing only the fields that are allowed to be updated
      return this.itemRepository.update(id, {...updateData , adminId});
    }
  
    async deleteMenuItem(id , adminId) {
      return await this.itemRepository.deleteByAdmin(id , adminId);
    }
  }
  
  module.exports = ItemService;