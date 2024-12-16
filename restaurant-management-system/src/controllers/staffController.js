class StaffController {
    constructor(staffService) {
      this.staffService = staffService;
    }
  
    register = async (req, res) => {
      try {
        const newStaff = await this.staffService.register(req.body);
        res.status(201).json(newStaff);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const { staff, token } = await this.staffService.login(email, password);
        res.status(200).json({ staff , token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    getAllStaff = async (req, res) => {
      try {
        const staff = await this.staffService.getAllStaff();
        res.status(200).json(staff);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
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
  
  module.exports = StaffController;
  