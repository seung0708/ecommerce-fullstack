const express = require ('express');
const router = express.Router();

//Getting all products from dummyjson
const fetchProductsFromDummyJson = async () => {
    const response = await fetch('https://dummyjson.com/products')
    const products = await response.json();
    console.log(products);
}

//Getting all products within a category from dummyjson
const fetchProductCategory = async (req, res) => {
    const category = req.params.category;
    const response = await fetch(`https://dummyjson.com/products/category/${category}`)
    
    const products = await response.json();
    console.log(products.products[0])
}

//Getting all categories from dummyjson
const fetchCategoriesFromDummyJson = async () => {
    const response = await fetch('https://dummyjson.com/products/category-list')
    const categories = await response.json();
    console.log(categories);
}

router.get('/products', fetchProductsFromDummyJson)
router.get('/products/category-list', fetchCategoriesFromDummyJson);
router.get('/products/category/:category', fetchProductCategory)

module.exports = router;