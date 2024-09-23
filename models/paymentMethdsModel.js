const pool = require('./database');

const createPaymentMethod = async(methodType) => {
    const result = await pool.query(
        `INSERT INTO payment_methods (method_type) VALUES ($1) RETURNING id`,[methodType]
    )
    //console.log(result)
    return result.rows[0].id;
}

const getPaymentMethodById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM payment_methods WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

module.exports = { createPaymentMethod, getPaymentMethodById };