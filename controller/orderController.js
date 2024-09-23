const {addOrderItems, getOrderItems} = require('../models/orderItemsModel');
const {createOrderInDB, getOrderByIdInDB, getOrderTotal} = require('../models/orderModel');

const createOrder = async (req, res) => {
    console.log(req.body);
    const {userId, cartId} = req.body;
    let orderId;
    try {
        const totalAmount = await getOrderTotal(userId);         
        if (!orderId) {
            orderId = await createOrderInDB(userId, cartId, totalAmount);
            await addOrderItems(cartId, orderId);
        } else {
            await addOrderItems(cartId, orderId);
        }
        
        const orderItems = await getOrderItems(orderId, cartId)
        const order = await getOrderByIdInDB(orderId)
        console.log(orderItems)
        if(orderItems) {
            res.status(201).json([orderItems, order]);
        } else {
            res.status(400).json({ error: 'Failed to create order' });
        }

    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await getOrderByIdInDB(orderId);
        res.status(201).json({order})
    } catch(error) {
        res.status(500).json({error: 'Failed to retrieve order'});
    }
}
 
module.exports = {
    createOrder,
    getOrderById
}