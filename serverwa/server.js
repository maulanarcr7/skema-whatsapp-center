const express = require('express');
const http = require('http');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoute');
const msgRoutes = require('./routes/msgRoute');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { handleIncomingChat, handleSendChat } = require('./controllers/chatController');
const qrcode = require('qrcode');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
const wss = new WebSocket.Server({ noServer: true });

let isReady = false;
let client; // Definisikan client di tingkat modul agar bisa diakses di seluruh fungsi

// Path untuk sesi
const sessionDir = path.join(__dirname, 'sessions');
const clientId = 'client-one';
const SESSION_FOLDER = path.join(sessionDir);

// Inisialisasi client WhatsApp
function initializeClient() {
    client = new Client({
        authStrategy: new LocalAuth({
            clientId: clientId,
            dataPath: sessionDir,
        }),
    });

    startBot(client, io);
}

// Fungsi untuk memulai bot
function startBot(client, io) {
    client.on('qr', (qr) => {
        console.log('QR code generated');
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR code', err);
                return;
            }
            io.emit('qr-code', url); // Kirim QR code ke frontend sebagai data URL
        });
        io.emit('status', isReady);
    });

    client.on('ready', async () => {
        isReady = true;
        io.emit('status', isReady);
        console.log('Bot siap digunakan!');
    });

    client.on('disconnected', async (reason) => {
        isReady = false;
        io.emit('status', isReady);
        console.log(`Client disconnected. Reason: ${reason}`);
        if (reason === 'LOGOUT' || reason === 'UNPAIRED_IDLE') {
            setTimeout(() => {
                deleteFolder(SESSION_FOLDER);
            }, 5000); // Beri waktu 5 detik sebelum menghapus folder agar tidak terkunci
        }
    });

    handleIncomingChat(client, io);
    client.initialize();
}

// Endpoint untuk logout dan ganti akun
app.post('/api/logout', async (req, res) => {
    try {
        if (client) {
            await client.logout(); // Logout dari WhatsApp
            console.log('Logged out successfully');
            isReady = false;
            io.emit('status', isReady);
        }

        // Hapus folder sesi
        deleteFolder(SESSION_FOLDER);

        // Mulai ulang client dengan sesi baru
        initializeClient();

        res.status(200).json({ message: 'Logged out and session reset successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Error during logout', error });
    }
});

// Fungsi untuk menghapus folder secara rekursif
function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${folderPath}`);
    } else {
        console.log(`Folder not found: ${folderPath}`);
    }
}

// Inisialisasi socket.io
io.on('connection', (socket) => {
    console.log('User connected');
    socket.emit('status', isReady);
    socket.on('getqr', () => {
        //     getQrCode(socket);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Inisialisasi WebSocket
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Handle Route API frontend Administrator
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/', msgRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize.sync({ alter: true })
    .then(() => console.log('Database connected and synchronized'))
    .catch(err => console.log('Error connecting to database', err));

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Mulai client WhatsApp
initializeClient();