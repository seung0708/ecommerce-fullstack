const pool = require('./database');

const createProduct = async (name, seller_id, price, categoryId, description, quantity, images) => {
    console.log(name, seller_id, price, categoryId, description, quantity, images)
}

const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    } catch(error) {
        console.error('Error in getAllProducts controller:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
}

const updateQuantityInProducts = async(productId, quantity) => {
    try {
        await pool.query(
            `UPDATE products
             SET quantity = GREATEST(quantity - $1, 0) 
             WHERE id = $2
             `,
            [quantity, productId]
        )
        
    } catch(error) {
        console.error(error)
    }
}

module.exports = {getAllProducts, updateQuantityInProducts};