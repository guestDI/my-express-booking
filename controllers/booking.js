const Booking = require('../models/booking');
const Room = require('../models/room');
const User = require('../models/user');

const createBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate, totalAmount } = req.body;
    const userId = req.user.id;

    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.requiresPayment) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: 'usd',
        metadata: { userId: userId, roomId: roomId },
      });

      await Payment.create({
        userId: userId,
        stripePaymentIntentId: paymentIntent.id,
        amount: totalAmount,
        currency: 'usd',
        status: paymentIntent.status,
      });

      return res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        message:
          'Payment required. Complete the payment to confirm your booking.',
      });
    } else {
      const newBooking = await Booking.create({
        room_id: roomId,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
      });

      res.status(201).json(newBooking);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Room },
        { model: User, attributes: { exclude: ['password_hash'] } },
      ],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Room },
        { model: User, attributes: { exclude: ['password_hash'] } },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.room_id = roomId || booking.room_id;
    booking.start_date = startDate || booking.start_date;
    booking.end_date = endDate || booking.end_date;

    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
