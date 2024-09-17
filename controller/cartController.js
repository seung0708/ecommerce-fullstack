const addItemToCart = async (req, res) => {
    const {productId, quantity} = req.body;
    try {
        const userId = req.user.id;
        await addItemToCart(userId, productId, quantity);
        res.status(200).json({message: 'Item added to cart'});
    } catch(error) {
        console.error('Error in addItemToCart in cartController')
        res.status(500).json({error: 'Failed to add item to cart'});
    }
}

module.exports = {
    addItemToCart
}