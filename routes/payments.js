require('dotenv').config();
const express = require ('express');
const { createPaymentForOrder } = require('../controller/paymentController');
const router = express.Router();

router.get('/', (req, res) => res.send(`Payment route is working,$`));
router.post('/', createPaymentForOrder);


module.exports = router;