require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const { createPaymentForOrder,  createStripeCheckout} = require('../controller/paymentController');
const router = express.Router();

router.get('/', (req, res) => res.send(`Payment route is working,$`));

router.use((req, res, next) => {
    console.log('CORS Middleware Hit:', req.method, req.url);
    next();
});

router.options('*', cors());
router.post('/', createStripeCheckout);


module.exports = router; 