const jwt = require('jsonwebtoken');
const SECRET_KEY = "expensejwtsecretket";

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Token sent as `Bearer <token>`
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        console.log("verified: ",verified)
        req.user = verified; // Attach user data to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateToken;
