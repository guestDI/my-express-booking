const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRole')
const { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/rooms')
const authenticateToken = require('../middleware/authMiddleware');
const { validate, createRoomSchema,  } = require('../middleware/validate');

router.post(
  '/',
  authenticateToken,
  checkRole('admin'),
  createRoomSchema,
  validate,
  createRoom
)
router.get('/', getAllRooms)
router.get('/:id', getRoomById)
router.put(
  '/:id',
  authenticateToken,
  checkRole('admin'),
  updateRoom
)
router.delete(
  '/:id',
  authenticateToken,
  checkRole('admin'),
  deleteRoom
)

module.exports = router
