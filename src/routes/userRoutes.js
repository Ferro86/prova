const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotte per gli utenti
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
router.get('/', authMiddleware.verifyToken, authMiddleware.requireRole('admin'), userController.getAllUsers);

module.exports = router;