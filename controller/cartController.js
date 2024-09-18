const {createCart, findCartByUserId} = require('../models/cartModel');
const {addItemToCart} = require('../models/cartItemModel');

const addToCart = async (req, res) => {
    console.log('cartController is called', req.body)
    const userId = req.body.user_id;
    const {product_id, quantity} = req.body;
    try {
        let cartId = await findCartByUserId(userId);
        if(!cartId) {
            cartId = await createCart(userId);
        }
        
        await addItemToCart(cartId, product_id, quantity);

        res.status(200).json({message: 'Item added to cart'});
    } catch(error) {
        console.error('Error in addItemToCart in cartController')
        res.status(500).json({error: 'Failed to add item to cart'});
    }
}

const getCartByUserId = async(req, res) => {
    const userId = req.user.id;
    try {
        const cart = await findCartByUserId(userId);

        if(!cart) {
            return res.status(404).json({message: 'No cart round for this user'});
        }

        const cartItems = await get
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch cart for user'});
    }
}

module.exports = {
    createCart,
    addToCart,
    getCartByUserId
}