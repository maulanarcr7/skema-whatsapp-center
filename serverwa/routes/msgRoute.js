const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');
router.get('/messages', MessageController.getAllMessages);
router.get('/messages/:id', MessageController.getMessageById);
router.post('/messages', MessageController.createMessage);
router.put('/messages/:id', MessageController.updateMessage);
router.delete('/messages/:id', MessageController.deleteMessage);

module.exports = router;
