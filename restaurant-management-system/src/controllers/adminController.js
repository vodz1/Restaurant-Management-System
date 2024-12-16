class AdminController {
    constructor(adminService) {
      this.adminService = adminService;
    }
  
    register = async (req, res) => {
      try {
        const newAdmin = await this.adminService.register(req.body);
        res.status(201).json(newAdmin);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const { admin, token } = await this.adminService.login(email, password);
        res.status(200).json({ admin , token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

 
  
    // getAllAdmins = async (req, res) => {
    //   try {
    //     const admins = await this.adminService.getAllAdmins();
    //     res.status(200).json(admins);
    //   } catch (error) {
    //     res.status(500).json({ message: error.message });
    //   }
    // };
  
    // getParentById = async (req, res) => {
    //   try {
    //     const parent = await this.parentService.getParentById(req.params.id);
    //     if (!parent) {
    //       return res.status(404).json({ message: "Parent not found" });
    //     }
    //     res.status(200).json(parent);
    //   } catch (error) {
    //     res.status(500).json({ message: error.message });
    //   }
    // };
  
  }
  
  module.exports = AdminController;
  