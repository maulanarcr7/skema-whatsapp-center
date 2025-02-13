const MessageChat = require('../models/MessageChat');
const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

let messagesByNumber = {};  // Menyimpan pesan berdasarkan nomor pengirim

const handleIncomingChat = (client, io) => {
  client.on('message', async (msg) => {
    const { from, to, body, mentionedIds } = msg;
    const isGroup = from.includes('@g.us'); // Cek apakah pesan berasal dari grup
    const isMentioned = mentionedIds && mentionedIds.includes(client.info.wid._serialized); // Cek apakah bot di-mention

    // Jika pesan dari grup dan bot di-mention
    if (isGroup && isMentioned) {
      // Ekstrak teks setelah mention
      const mentionText = `@${client.info.wid.user}`; // Ambil username bot
      const menu = body.split(mentionText)[1].trim(); // Ambil teks setelah mention

      console.log(`Pesan diterima dari grup: ${msg.from}`);
      console.log(`Isi Pesan: ${body}`);
      console.log(`Menu yang dipilih: ${menu}`);

      // Cari menu di database
      const response = await MessageChat.findOne({ where: { menu: menu } });

      if (response) {
        try {
          if (response.image) {
            const media = MessageMedia.fromFilePath(path.join(__dirname, '../uploads', response.image));
            await client.sendMessage(from, media, { caption: response.data });
          } else {
            await client.sendMessage(from, response.data);
            console.log(`Balasan otomatis dikirim ke grup ${from}: ${response.data}`);
          }
        } catch (error) {
          console.error(`Gagal mengirim balasan otomatis ke grup ${from}:`, error);
        }
      } else {
        // Ambil pesan default dari database
        const defaultResponse = await MessageChat.findOne({ where: { menu: 'defaultMessage' } });
        if (defaultResponse) {
          try {
            if (defaultResponse.image) {
              const media = MessageMedia.fromFilePath(path.join(__dirname, '../uploads', defaultResponse.image));
              await client.sendMessage(from, media, { caption: defaultResponse.data });
            } else {
              await client.sendMessage(from, defaultResponse.data);
              console.log(`Pesan default dikirim ke grup ${from}: ${defaultResponse.data}`);
            }
          } catch (error) {
            console.error(`Gagal mengirim pesan default ke grup ${from}:`, error);
          }
        } else {
          console.error('Pesan default tidak ditemukan di database.');
        }
      }
    } else if (!isGroup) {
      // Jika pesan bukan dari grup, tangani pesan pribadi
      console.log(`Pesan diterima dari chat pribadi: ${msg.from}`);
      console.log(`Isi Pesan: ${body}`);

      // Cari menu di database
      const response = await MessageChat.findOne({ where: { menu: body.toLowerCase().trim() } });

      if (response) {
        try {
          if (response.image) {
            const media = MessageMedia.fromFilePath(path.join(__dirname, '../uploads', response.image));
            await client.sendMessage(from, media, { caption: response.data });
          } else {
            await client.sendMessage(from, response.data);
            console.log(`Balasan otomatis dikirim ke ${from}: ${response.data}`);
          }
        } catch (error) {
          console.error(`Gagal mengirim balasan otomatis ke ${from}:`, error);
        }
      } else {
        // Ambil pesan default dari database
        const defaultResponse = await MessageChat.findOne({ where: { menu: 'defaultMessage' } });
        if (defaultResponse) {
          try {
            if (defaultResponse.image) {
              const media = MessageMedia.fromFilePath(path.join(__dirname, '../uploads', defaultResponse.image));
              await client.sendMessage(from, media, { caption: defaultResponse.data });
            } else {
              await client.sendMessage(from, defaultResponse.data);
              console.log(`Pesan default dikirim ke ${from}: ${defaultResponse.data}`);
            }
          } catch (error) {
            console.error(`Gagal mengirim pesan default ke ${from}:`, error);
          }
        } else {
          console.error('Pesan default tidak ditemukan di database.');
        }
      }
    }
  });
  return true;
};

const handleSendChat = (client, io) => {
  io.on('connection', (socket) => {
      socket.on('send-message', async (data) => {
          const { number, message } = data;
          try {
              const chatId = `${number}@c.us`;
              await client.sendMessage(chatId, message);
              socket.emit('message-status', { status: 'success', message: 'Pesan berhasil dikirim' });
          } catch (error) {
              socket.emit('message-status', { status: 'error', message: 'Gagal mengirim pesan', error });
          }
      });
  });
};

const getChatByNumber = (number) => {
  return messagesByNumber[number] || [];
};

module.exports = {
  handleIncomingChat,
  handleSendChat,
  getChatByNumber
};