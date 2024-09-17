const pool = require('./database');

const addToCart = async (userId, productId, quantity) => {
    try {
        await pool.query('INSERT INTO cart_items(')
    }
}
