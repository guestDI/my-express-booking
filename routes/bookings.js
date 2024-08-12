const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const bookingController = require('../controllers/booking')

router.post('/', authenticateToken, bookingController.createBooking);
router.get('/', authenticateToken, bookingController.getAllBookings);
router.get('/:id', authenticateToken, bookingController.getBookingById);
router.put('/:id', authenticateToken, bookingController.updateBooking);
router.delete('/:id', authenticateToken, bookingController.deleteBooking);

module.exports = router;
