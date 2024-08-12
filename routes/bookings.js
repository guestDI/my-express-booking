const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const bookingController = require('../controllers/booking')

router.post('/bookings', authenticateToken, bookingController.createBooking);
router.get('/bookings', authenticateToken, bookingController.getAllBookings);
router.get('/bookings/:id', authenticateToken, bookingController.getBookingById);
router.put('/bookings/:id', authenticateToken, bookingController.updateBooking);
router.delete('/bookings/:id', authenticateToken, bookingController.deleteBooking);
