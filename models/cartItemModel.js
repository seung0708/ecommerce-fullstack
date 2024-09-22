const pool = require('./database');

const addItemToCart = async (cartId, product_id, quantity) => {
    await pool.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (cart_id, product_id)  
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity 
        `,[cartId, product_id, quantity]
   );
}


// Update the quantity of a specific cart item
const updateCartItemInDB = async (cartItemId, quantity) => {
    await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE id = $2',
        [quantity, cartItemId]
    );
};

// Delete a cart item
const deleteCartItemInDB = async (cartItemId) => {
    console.log('cartItemModel', cartItemId)
    await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
};

module.exports = {
    addItemToCart,
    updateCartItemInDB,
    deleteCartItemInDB
};