
  const staffMiddleware = (req, res, next) => {
    
    if (!req.user) {
      console.log("No user found in Staff middleware");
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    if (req.user.role !== "staff") {
      console.log("Insufficient permissions: Not a Staff. User role is:", req.user.role);
      return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
    
    console.log("Staff role verified successfully.");
    next();
  };
  module.exports = staffMiddleware;
