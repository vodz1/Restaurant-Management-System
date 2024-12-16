
class ItemController {
    constructor(ItemService) {
      this.ItemService = ItemService;
    }
  
    async create(req, res) {
      try {
        const adminId = req.user.id;
        const menuItem = await this.ItemService.createMenuItem(req.body , adminId);
        res.status(201).json(menuItem);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getAll(req, res) {
      try {
        const { category, sortByPrice } = req.query;
        const menuItems = await this.ItemService.getMenuItems(category, sortByPrice);
        console.log("items" , menuItems)
        res.status(200).json(menuItems);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async update(req, res) {
      try {
        const adminId = req.user.id
        const updatedItem = await this.ItemService.updateMenuItem(req.params.id, req.body , adminId );
        res.status(200).json(updatedItem);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async delete(req, res) {
      try {
        const adminId = req.user.id
        await this.ItemService.deleteMenuItem(req.params.id , adminId);
        res.status(204).send();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = ItemController;
  