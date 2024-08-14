import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-06-20',
});

export default stripe;
