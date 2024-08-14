const express = require('express');
const router = express.Router();
const paymentsController = require('../../controllers/payments');
const authenticateToken = require('../middleware/authenticateToken');

router.post(
  '/create-payment-intent',
  authenticateToken,
  paymentsController.createPaymentIntent
);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentsController.handleWebhook
);

module.exports = router;
