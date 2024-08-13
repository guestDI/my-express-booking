const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2024-06-20',
});

module.exports = stripe;
