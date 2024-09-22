const {getAllProducts} = require('../models/productModel');
const {fetchCategoriesById} = require('../models/categoryModel');

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
    const {name, seller_id, price, description, quantity, images, categoryName} = req.body; 
    const categoryId = await fetchCategoriesById(categoryName);

    try {
        const product = await createProduct(name, seller_id, price, categoryId, description, quantity, images);
        // if (product) {
        //     res.status(201).json({message: 'Product successsfully created'})
        // } else {
        //     res.status(500).json({error: 'Failed to create products'});
        // }
    } catch(error) {    
        // console.log(error)
        // res.status(500).json({err: 'Something went wrong adding product'});
    }

}

module.exports = {
    fetchAllProducts,
    addProduct
}