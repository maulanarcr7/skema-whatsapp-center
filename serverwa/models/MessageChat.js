const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Gunakan koneksi dari database.js

// Definisi model MessageChat
const MessageChat = sequelize.define('message_chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    menu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true, // Menambahkan kolom createdAt & updatedAt
});

// Fungsi untuk seed data
async function seedChatData() {
    const seedData = [
        { menu: 'defaultMessage', data: 'Halo saudara/i \n\n Mohon maaf, *SKEMA WhatsApp Center* saat ini belum bisa mengerti permintaan Anda.\n\nUntuk mencari informasi yang tersedia, Kamu bisa ketik *Ping* \n\nTerimakasih telah menggunakan layanan ini 😊', image: null }
    ];

    for (const item of seedData) {
        await MessageChat.findOrCreate({
            where: { menu: item.menu },
            defaults: item
        });
    }
}

// Sinkronisasi model dengan database dan seed data
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
    seedChatData();
});

module.exports = MessageChat;