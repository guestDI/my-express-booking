const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRole')
const roomController = require('../controllers/rooms')
const authenticateToken = require('../middleware/authMiddleware')

router.post(
  '/',
  authenticateToken,
  checkRole('admin'),
  roomController.createRoom
)
router.get('/', roomController.getAllRooms)
router.get('/:id', roomController.getRoomById)
router.put(
  '/:id',
  authenticateToken,
  checkRole('admin'),
  roomController.updateRoom
)
router.delete(
  '/:id',
  authenticateToken,
  checkRole('admin'),
  roomController.deleteRoom
)

module.exports = router
