const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotta per inviare una notifica a un utente (protetta)
router.post('/send', authMiddleware.verifyToken, notificationController.sendNotification);

// Rotta per ottenere tutte le notifiche di un utente (protetta)
router.get('/user/:userId', authMiddleware.verifyToken, notificationController.getUserNotifications);

module.exports = router;
