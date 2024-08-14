import { Response } from 'express';
import { Room, User, Booking, Payment } from '../models';
import stripe from '../config/stripe';

export const createBooking = async (req, res: Response) => {
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

export const getAllBookings = async (req, res: Response) => {
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

export const getBookingById = async (req, res: Response) => {
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

export const updateBooking = async (req, res: Response) => {
  try {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.roomId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.start_date = startDate || booking.start_date;
    booking.end_date = endDate || booking.end_date;

    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBooking = async (req, res: Response) => {
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

export const cancelBooking = async (req, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};