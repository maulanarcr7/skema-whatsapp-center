const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader  = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Akses ditolak, token tidak tersedia' });
    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token tidak valid' });
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
