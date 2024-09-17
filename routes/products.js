const express = require ('express');
const router = express.Router();
const {fetchAllProducts} = require('../controller/productController');

//Products displayed on customer site
router.get('/', fetchAllProducts)

//router.post('/', addProduct)

module.exports = router;