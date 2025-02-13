const MessageChat = require('../models/MessageChat');
const upload = require('../middleware/uploadMiddleware');


// Get All Messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await MessageChat.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
};

// Get Message by ID
const getMessageById = async (req, res) => {
    try {
        const message = await MessageChat.findByPk(req.params.id);
        if (!message) return res.status(404).json({ message: 'Pesan tidak ditemukan' });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
};

// Create New Message
const createMessage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { menu, data } = req.body;
            const newMessage = await MessageChat.create({
                menu,
                data,
                image: req.file ? req.file.filename : null, // Jika ada file, gunakan nama file
            });
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ message: 'Gagal membuat pesan', error: error.message });
        }
    });
};

// Update Message
const updateMessage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const { menu, data } = req.body;

            // Cari pesan berdasarkan ID
            const message = await MessageChat.findByPk(id);
            if (!message) {
                return res.status(404).json({ message: 'Pesan tidak ditemukan' });
            }

            // Jika ada file gambar baru, update nama file
            if (req.file) {
                message.image = req.file.filename;
            }

            // Update menu dan data
            message.menu = menu;
            message.data = data;

            // Simpan perubahan ke database
            await message.save();
            // Kirim notifikasi bahwa pesan berhasil diperbarui
            console.log('Pesan berhasil diperbarui:', message);
            // Kirim respons sukses
            res.json({ message: 'Pesan berhasil diperbarui', data: message });
        } catch (error) {
            res.status(500).json({ message: 'Gagal memperbarui pesan', error: error.message });
        }
    });
};

// Delete Message
const deleteMessage = async (req, res) => {
    try {
        const message = await MessageChat.findByPk(req.params.id);
        if (!message) return res.status(404).json({ message: 'Pesan tidak ditemukan' });

        await message.destroy();
        res.json({ message: 'Pesan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus pesan', error: error.message });
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
};