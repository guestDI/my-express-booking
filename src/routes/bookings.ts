import express from 'express';
const router = express.Router();
import checkRole from '../middleware/authMiddleware';
import authenticateToken from '../middleware/authMiddleware';
import { createBooking, getAllBookings, getBookingById, deleteBooking, updateBooking, cancelBooking } from '../controllers/booking';
import { validate, createBookingSchema } from '../middleware/validate';

router.post(
  '/',
  authenticateToken,
  createBookingSchema,
  validate,
  createBooking
);
router.get('/', authenticateToken, getAllBookings);
router.get('/:id', authenticateToken, getBookingById);
router.put('/:id', authenticateToken, updateBooking);
// router.delete('/:id', authenticateToken, checkRole('admin'), deleteBooking);
router.get('/cancel', authenticateToken, cancelBooking);

module.exports = router;
