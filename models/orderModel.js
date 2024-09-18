const pool = require('./database');

const createOrderInDB = async (userId, cartId, totalAmount) => {
    const result = await pool.query(
        `INSERT INTO orders (user_id, cart_id, total_amount, status)
         VALUES($1, $2, $3, 'pending') RETURNING id
        `,
        [userId, cartId, totalAmount]
    );
    
    return result.rows[0].id;
};

const getOrderTotal = async (userId) => {
    const result = await pool.query(`
        SELECT SUM(ci.quantity * p.price) AS total
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        JOIN carts c ON ci.cart_id = c.id
        WHERE c.user_id = $1
    `, [userId]);

    return result.rows[0].total || 0; 
}

const getOrderByIdInDB = async(orderId) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    return result.rows[0];
}

module.exports = {
    createOrderInDB,
    getOrderByIdInDB, 
    getOrderTotal
}
