const pool = require('./database');

const createPayment = async(userId, orderId, paymentMethodId, amount, status, transactionReference) => {
    const result = await pool.query(
        `INSERT INTO payments (user_id, order_id, payment_method_id, amount, status, transaction_reference)
         VALUES($1, $2, $3, $4, $5, $6)
        `, [userId, orderId, paymentMethodId, amount, status, transactionReference]
    )
    return result.rows[0].id;
}

const getPaymentByID = async (id) => {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = {
    createPayment,
    getPaymentByID
}