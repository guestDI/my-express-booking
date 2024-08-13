const stripe = require('../config/stripe');

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });

    await Payment.create({
      userId: userId,
      stripePaymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
      status: paymentIntent.status,
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Error creating payment intent' });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res
      .status(400)
      .json({ message: 'Webhook signature verification failed' });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      await Payment.update(
        { status: paymentIntent.status },
        { where: { stripePaymentIntentId: paymentIntent.id } }
      );

      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Received webhook');
};

module.exports = {
  createPaymentIntent,
  handleWebhook,
};
