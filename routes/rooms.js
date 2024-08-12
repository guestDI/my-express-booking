const express = require('express')
const router = express.Router();
const checkRole = require('../middleware/checkRole');

router.post('/rooms', authenticateToken, checkRole('admin'), roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.put('/rooms/:id', authenticateToken, checkRole('admin'), roomController.updateRoom);
router.delete('/rooms/:id', authenticateToken, checkRole('admin'), roomController.deleteRoom);

module.exports = router
