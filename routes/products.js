const express = require ('express');
const router = express.Router();
const {fetchProductsFromDummyJson } = require('../models/productModel');

//Products displayed on customer site
router.get('/', async (req, res) => {
    const role = req.role;
    if(role === 'seller') {
        await displayProducts(req, res, 'seller');
    } else if (role === 'customer') {
        await displayProducts(req, res, 'customer')
    } else {
        res.status(400).json({error: 'Invalid role specified'});
    }
})

router.post('/', addProduct)

module.exports = router;