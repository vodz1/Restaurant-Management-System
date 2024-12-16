class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    register = async (req, res) => {
      try {
        const newUser = await this.userService.register(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const { user, token } = await this.userService.login(email, password);
        res.status(200).json({ user , token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    getAllUsers = async (req, res) => {
      try {
        const user = await this.userService.getAllUsers();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    async forgetPassword(req, res) {
      try {
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ message: 'Email is required.' });
        }
        const result = await this.userService.forgetPassword(email);
        res.json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async verifyCode(req, res) {
      try {
        const { email, code } = req.body;
        const result = await this.userService.verifyResetCode(email, code);
        res.json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    async resetPassword(req, res) {
      try {
        const { resetToken, newPassword } = req.body;
        if (!resetToken) {
          return res.status(400).json({ message: 'resetToken is required.' });
        }

        if (!newPassword) {
          return res.status(400).json({ message: 'New password is required.' });
        }
        const result = await this.userService.resetPassword(resetToken, newPassword);
        res.json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

  
  }
  
  module.exports = UserController;
  