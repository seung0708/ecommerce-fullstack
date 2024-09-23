const pool = require('./database');

const createCart = async (userId) => {
    const result = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [userId]);
    return result.rows[0].id;
}

const findCartByUserId = async (userId) => {
    const result = await pool.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
    return result.rows.length ? result.rows[0].id : null;
};

// Get all cart items for a specific cart
const getItemsInCart = async (cartId) => {
    const result = await pool.query(
        `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.images
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1`,
        [cartId]
    );
    return result.rows;
};

const deleteCart = async (cartId) => {
    await pool.query('DELETE FROM carts WHERE id = $1',[cartId]);
    await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
}

module.exports = {
    createCart,
    findCartByUserId,
    getItemsInCart,
    deleteCart
}