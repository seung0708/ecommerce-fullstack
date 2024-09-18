require('dotenv').config();
const express = require ('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY)


router.get('/', (req, res) => res.send(`Payment route is working,$`));

module.exports = router;