const express = require ('express');
const router = express.Router();
const {fetchAllProducts, addProduct} = require('../controller/productController');
const {isAuthenticated, isSeller} = require('../routes/middleware');

//Products displayed on customer site
router.get('/', fetchAllProducts)

router.post('/',isAuthenticated, isSeller, addProduct)

module.exports = router;