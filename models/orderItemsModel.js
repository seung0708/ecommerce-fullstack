const pool =  require('./database');

const addOrderItems = async (cartId, orderId) => {
    const result = await pool.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        SELECT $1, product_id, cart_items.quantity, (cart_items.quantity * products.price)
        FROM cart_items
        JOIN products ON cart_items.product_id = products.id
        WHERE cart_id = $2
    `, [orderId, cartId]);

    return result;
};

module.exports = addOrderItems;