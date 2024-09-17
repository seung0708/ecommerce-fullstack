const {getAllProducts} = require('../models/productModel');

const fetchAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(201).json(products);
    } catch(error) {
        console.error('Error in fetchAllProducts controller:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

const addProduct = async (req, res) => {

}

module.exports = {
    fetchAllProducts
}