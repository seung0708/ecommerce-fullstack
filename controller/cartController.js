const {createCart, findCartByUserId, getItemsInCart} = require('../models/cartModel');
const {addItemToCart} = require('../models/cartItemModel');
const {updateQuantityInProducts} = require('../models/productModel');

const addToCart = async (req, res) => { 
    const {userId, productId, quantity} = req.body;
    console.log('cartController', req.body)
    let cartId
    let cartItems;
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
        const cartId = await findCartByUserId(userId)
        const cart = await getItemsInCart(cartId)
        console.log('cartController',cart)
        if(cart) {
            res.status(200).json(cart);
        }
        
    } catch(error) {
        console.error('Error in addItemToCart in cartController')
        res.status(500).json({error: 'Failed to add item to cart'});
    }
}

const getCartByUserId = async(req, res) => {
    const userId = req.params.userId;
    try {
        const cartId = await findCartByUserId(userId);
        if(!cartId) {
            return res.status(404).json({message: 'No cart found for this user'});
        }
        const cart = await getItemsInCart(cartId);
        res.status(201).json({cart, cartId})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to fetch cart for user'});
    }
}

module.exports = {
    createCart,
    addToCart,
    getCartByUserId
}