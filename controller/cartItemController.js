const {updateCartItemInDB, deleteCartItemInDB} = require('../models/cartItemModel');

// Update the quantity of an item in the cart
const updateCartItem = async (req, res) => {
    
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;
 
    try {
        await updateCartItemInDB(cartItemId, quantity);
        res.status(200).json({ message: 'Item quantity updated' });
    } catch (error) {
        console.error('Error in updateCartItem in cartItemController:', error);
        res.status(500).json({ error: 'Failed to update item quantity' });
    }
};

// Remove an item from the cart
const deleteCartItem = async (req, res) => {
    const cartItemId = req.params.cartItemId;
    console.log(req.params, cartItemId);
    //await deleteCartItem(cartItemId);
    if (!cartItemId) {
        return res.status(400).json({ error: 'Cart item ID is required' });
    }
    try {
        await deleteCartItemInDB(cartItemId);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error in deleteCartItem in cartItemController:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};

module.exports = {
    updateCartItem,
    deleteCartItem
}