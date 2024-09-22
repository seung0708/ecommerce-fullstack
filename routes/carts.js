const express = require ('express');
const router = express.Router();


const {getCartByUserId, addToCart} = require('../controller/cartController.js');
router.get('/', (req, res) => res.send('Carts route is working'));
router.post('/', addToCart);
router.get('/:userId', getCartByUserId)


module.exports = router;