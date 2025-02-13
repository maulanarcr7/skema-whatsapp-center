const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Seed user admin
async function seedAdmin() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.findOrCreate({
        where: { nama:'Administrator', username: 'admin' },
        defaults: { password: hashedPassword }
    });
}


seedAdmin();
module.exports = User;
