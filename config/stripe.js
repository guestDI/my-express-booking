const Stripe = require('stripe');
const stripe = new Stripe('your_stripe_secret_key', {
  apiVersion: '2022-11-15', 
});

module.exports = stripe;
