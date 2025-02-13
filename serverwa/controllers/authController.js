const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Password salah' });
        
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: 'true', message: 'Login berhasil', data: user, token });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
};
exports.logout = async (req, res) => {
    res.json({ message: 'Logout berhasil' });
};
