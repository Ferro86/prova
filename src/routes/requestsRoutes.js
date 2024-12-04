const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotte per le richieste
router.post('/', authMiddleware.verifyToken, requestsController.createRequest);
router.get('/', authMiddleware.verifyToken, requestsController.getAllRequests);
router.get('/:requestId', authMiddleware.verifyToken, requestsController.getRequestById);
router.patch('/:requestId/status', authMiddleware.verifyToken, requestsController.updateRequestStatus);
router.post('/:requestId/messages', authMiddleware.verifyToken, requestsController.sendMessage);
router.get('/:requestId/messages', authMiddleware.verifyToken, requestsController.getMessages);
module.exports = router;
