const pool = require('./database');

const createProduct = async (name, description, price, quantity) => {

}

const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT name, price, description, images FROM products');
        return result.rows;
    } catch(error) {
        console.error('Error in getAllProducts controller:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
}

module.exports = {getAllProducts};