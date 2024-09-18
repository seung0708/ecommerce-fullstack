const {createOrderInDB, getOrderByIdInDB} = require('../models/orderModel');

const createOrder = async(req, res) => {
    const userId = req.body.id;
    const {cartId, payment_method_id} = req.body; 
    try {
        const order = await createOrderInDB(userId, cartId, payment_method_id);
        res.status(201).json({order});
    } catch (error) {
        res.status(500).JSON({error: 'Failed to create order'});
    }
}

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await getOrderByIdInDB(orderId);
        res.status(200).JSON({order})
    } catch(error) {
        res.status(500).json({error: 'Failed to retrieve order'});
    }
}

module.exports = {
    createOrder,
    getOrderById
}