const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: ['id', 'username'] });
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    const { nama, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ error: 'Username sudah digunakan' });

        const newUser = await User.create({ nama, username, password });
        res.status(201).json({ message: 'User berhasil dibuat', user: { id: newUser.id, nama: newUser.nama, username: newUser.username } });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat membuat user' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { nama, username, password } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

        if (nama) user.nama = nama;
        if (username) user.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ message: 'User berhasil diperbarui', user: { id: user.id, nama: user.nama, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui user' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

        await user.destroy();
        res.json({ message: 'User berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus user' });
    }
};