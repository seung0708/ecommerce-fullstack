const express = require ('express');
const router = express.Router();
const {addItemToCart} = require('../controller/cartController.js');

router.post('/add', addItemToCart);


module.exports = router;