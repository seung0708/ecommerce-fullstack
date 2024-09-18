const addOrderItems = require('../models/orderItemsModel');
const {createOrderInDB, getOrderByIdInDB, getOrderTotal} = require('../models/orderModel');

const createOrder = async (req, res) => {
    console.log(req.body);
    const {user_id, cart_id} = req.body;
    try {
        const totalAmount = await getOrderTotal(user_id); 

        const orderId = await createOrderInDB(user_id, cart_id, totalAmount);
        
        if (orderId) {
            await addOrderItems(cart_id, orderId);
            res.status(201).json({ message: 'Order created successfully', orderId });
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