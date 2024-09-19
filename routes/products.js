const express = require ('express');
const router = express.Router();
const {fetchAllProducts, addProduct} = require('../controller/productController');
const {isAuthenticated, isSeller} = require('../routes/middleware');
const { fetchCategoriesFromDummyJson } = require('../models/categoryModel');

//Products displayed on customer site
router.get('/json', (req,res) => res.send('Dummyjson is working'))
router.get('/', fetchAllProducts)

router.post('/',isAuthenticated, isSeller, addProduct)

module.exports = router;