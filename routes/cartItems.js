const express = require('express');
const router = express.Router();
const {updateCartItem, deleteCartItem} = require('../controller/cartItemController')

//router.get('/', (req, res) => res.send('CartItems route is working'))
router.put('/:cartItemId', updateCartItem);
router.delete('/:cartItemId', deleteCartItem);

module.exports = router;  