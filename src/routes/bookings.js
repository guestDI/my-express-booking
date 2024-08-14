const express = require('express');
const router = express.Router();
const checkRole = require('../../middleware/authMiddleware');
const authenticateToken = require('../../middleware/authMiddleware');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
  cancelBooking,
} = require('../controllers/booking');
const { validate, createBookingSchema } = require('../../middleware/validate');

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