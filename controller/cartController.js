const {createCart, findCartByUserId} = require('../models/cartModel');
const {addItemToCart} = require('../models/cartItemModel');
const {updateQuantityInProducts} = require('../models/productModel');

const addToCart = async (req, res) => { 
    //console.log('cartController is called', req.body)
    const {userId, productId, quantity} = req.body;
    let cartItems
    let cartId
    try {
        const updateQuantity = await updateQuantityInProducts(productId, quantity);
        if (updateQuantity === 0) {
            throw new Error('Product not found or insufficient quantity');
        }

        let usersCartId = await findCartByUserId(userId);
        if(!usersCartId) {
            cartId = await createCart(userId);
            cartItems = await addItemToCart(cartId, productId, quantity);
        } else {
            cartItems = await addItemToCart(usersCartId, productId, quantity)
        }
        //console.log('cartController', cart)
        res.status(200).json({message: 'Item added to cart', cartItems});
    } catch(error) {
        console.error('Error in addItemToCart in cartController')
        res.status(500).json({error: 'Failed to add item to cart'});
    }
}

const getCartByUserId = async(req, res) => {
    const userId = req.params.userId;
    console.log(req.params, userId)
    try {
        const cart = await findCartByUserId(userId);
        if(!cart) {
            return res.status(404).json({message: 'No cart found for this user'});
        }
        res.status(201).json({message: `Cart ID ${cart}`})
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch cart for user'});
    }
}

module.exports = {
    createCart,
    addToCart,
    getCartByUserId
}