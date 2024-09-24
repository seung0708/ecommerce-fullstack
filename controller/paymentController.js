require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { deleteCart } = require('../models/cartModel');
const {getOrderByIdInDB, updateOrderStatus} = require('../models/orderModel');
const { createPaymentMethod } = require('../models/paymentMethdsModel');
const {createPayment} = require('../models/paymentModel');
const { updateQuantityInProducts } = require('../models/productModel');

const createPaymentForOrder = async (req, res)=> {
    //console.log(req.body)
    const {user_id, order_id, method_type, provider_details} = req.body ;
    try {
        const totalAmount = await getOrderByIdInDB(order_id);
        const cleanedTotalAmount = totalAmount.total_amount.replace(/[^0-9.]/g, '');
        const amount = parseFloat(cleanedTotalAmount);
        //console.log(amount)

        const paymentMethodId = await createPaymentMethod(method_type, provider_details);

        let transactionReference; 
        if(method_type === 'stripe') {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), 
                currency: 'usd',
            })
            transactionReference = paymentIntent
        }
        console.log(transactionReference.id)
        // const paymentId = await createPayment(user_id, order_id, paymentMethodId, amount, 'pending', transactionReference.id);
        // res.status(200).json({message: 'Payment successful', paymentId});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Payment Failed'})
    }
}

const createStripeCheckout = async (req, res) => {
    const {userId, currentOrder, orderItems, methodType} = req.body; 
    console.log(req.body)
    const line_items = orderItems.map(item => (
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
            unit_amount: Math.round(item.price * 100), 
            }, 
            quantity: item.quantity
        }
    ))

    try {
        
        const paymentMethodId = await createPaymentMethod(methodType);
    
        const payment = await createPayment(userId, currentOrder.id, paymentMethodId, currentOrder.total_amount, 'completed');
        console.log(payment)
        if(payment) {
            await updateOrderStatus(currentOrder.id, 'completed');
            await deleteCart(currentOrder.cart_id);
            for (const item of orderItems) {
                await updateQuantityInProducts(item.product_id, item.quantity);
            }
        }

        const session = await stripe.checkout.sessions.create({
            line_items: line_items, 
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        })

        console.log(session);
        res.json({url: session.url});
    } catch(error) {
        console.error(error)
    }

}



module.exports = {createPaymentForOrder, createStripeCheckout} 