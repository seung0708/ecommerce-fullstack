const express = require ('express');
const router = express.Router();
const {fetchProductsFromDummyJson } = require('../models/productModel');

//router.get('/', fetchProductsFromDummyJson);

module.exports = router;