const pool = require('./database');

const createOrderInDB = async (userId, cartId, paymentMehotId) => {
    const result = await pool.query(
        `INSERT INTO orders (user_id, cart_id, payment_method_id, status)
         VALUES($1,$2,$3, 'pending') RETURNING id
        `,
        [userId, cartId, paymentMehotId]
    )
}

const getOrderByIdInDB = async(orderId) => {
    const result = await pool.query('SELECT & FROM orders WHERE id = $1', [orderId]);
    return result.rows[0];
}

module.exports = {
    createOrderInDB,
    getOrderByIdInDB
}