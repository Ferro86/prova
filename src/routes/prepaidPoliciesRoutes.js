const express = require('express');
const router = express.Router();
const prepaidPoliciesController = require('../controllers/prepaidPoliciesController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotta per aggiungere polizze prepagate (protetta)
router.post('/add', authMiddleware.verifyToken, prepaidPoliciesController.addPrepaidPolicies);

// Rotta per ottenere le polizze prepagate di un utente (protetta)
router.get('/:userId', authMiddleware.verifyToken, prepaidPoliciesController.getPrepaidPolicies);

module.exports = router;
