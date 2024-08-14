import express from 'express';
const router = express.Router();
import { createPaymentIntent, handleWebhook } from '../controllers/payments';
import authenticateToken from '../middleware/authMiddleware';

router.post(
  '/create-payment-intent',
  authenticateToken,
  createPaymentIntent
);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

export default router;
