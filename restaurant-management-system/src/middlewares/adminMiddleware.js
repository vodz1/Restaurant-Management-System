const adminMiddleware = (req, res, next) => {
    console.log("Admin middleware executed");
    
    if (!req.user) {
      console.log("No user found in admin middleware");
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    console.log("user role " , req.user.role)
    if (req.user.role !== "admin") {
      console.log("Insufficient permissions: Not an admin. User role is:", req.user.role);
      return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
    
    console.log("Admin role verified successfully.");
    next();
  };
  
module.exports = adminMiddleware  