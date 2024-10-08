const pool =  require('./database');

const addOrderItems = async (cartId, orderId) => {
    await pool.query(`
        INSERT INTO order_items (order_id, cart_id, product_id, quantity, price)
        SELECT $1, $2, cart_items.product_id, cart_items.quantity, (cart_items.quantity * products.price)
        FROM cart_items
        JOIN products ON cart_items.product_id = products.id
        WHERE cart_id = $2
    `, [orderId, cartId]);

};

const getOrderItems = async(orderId) => {
    const result = await pool.query(`
        SELECT oi.quantity, oi.product_id, oi.price, p.name
        FROM order_items oi
        JOIN products p
            on oi.product_id = p.id
        WHERE oi.order_id = $1
        `,[orderId]
    );
    return result.rows
}



module.exports = {addOrderItems, getOrderItems};