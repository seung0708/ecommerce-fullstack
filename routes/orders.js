const express = require ('express');
const router = express.Router();
const {createOrder, getOrderById} = require('../controller/orderController');

router.get('/', (req, res) => res.send('Orders route is working'));

router.post('/', createOrder);
router.get('/:orderId', getOrderById);

module.exports = router;  