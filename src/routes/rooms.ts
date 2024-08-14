import express from 'express';
const router = express.Router();
import checkRole from '../middleware/checkRole';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, searchRooms } from '../controllers/rooms';
import authenticateToken from '../middleware/authMiddleware';
import { validate, createRoomSchema } from '../middleware/validate';

router.post(
  '/',
  authenticateToken,
  checkRole('admin'),
  createRoomSchema,
  validate,
  createRoom
);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/search', searchRooms);
router.put('/:id', authenticateToken, checkRole('admin'), updateRoom);
router.delete('/:id', authenticateToken, checkRole('admin'), deleteRoom);

module.exports = router;
