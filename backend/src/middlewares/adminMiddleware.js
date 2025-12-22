const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Auth token missing",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded.role);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin Access only",
      });
    }
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
module.exports = adminMiddleware;
