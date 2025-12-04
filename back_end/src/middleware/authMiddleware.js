// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, role: payload.role }; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin only" });
    }
    next();
};
