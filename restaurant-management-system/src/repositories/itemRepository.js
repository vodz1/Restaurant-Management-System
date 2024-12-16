const BaseRepository = require('./BaseRepository');
const Items = require('../models/Menuitem/menuItems');

 class ItemRepository extends BaseRepository {
     static instance;

    // Private constructor to prevent direct instantiation
     constructor() {
        super(Items); // Call the constructor of the BaseRepository, if needed
        if (!ItemRepository.instance) {
            ItemRepository.instance = this
        }
        return ItemRepository.instance;
    }

    async createItem(itemData, adminId) {
        try {
          // Create the item and associate it with the given adminId
          const newItem = await this.model.create({
            ...itemData,
            adminId, // Set the adminId for the new item
          });
    
          return newItem;
        } catch (error) {
          console.error("Error creating item:", error);
          throw error; // Throw the error to be handled by the controller
        }
      }

      async deleteByAdmin(itemId, adminId) {
        // Fetch the item to ensure it exists and belongs to the admin
        const item = await this.model.findOne({
            where: { id: itemId, adminId },
        });

        if (!item) {
            throw new Error('Item not found or you do not have permission to delete it.');
        }

        // Perform the delete operation
        await item.destroy();
        return { message: 'Item deleted successfully.' };
    }

    
    async filterByCategoryAndSort(category , sortByPrice = 'ASC') {
        return await this.model.findAll({
          where: { category },
          order: [['price', sortByPrice]],
        });
      }
}

module.exports = ItemRepository;