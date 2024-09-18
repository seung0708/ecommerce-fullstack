require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const {getOrderByIdInDB} = require('../models/orderModel');
const { createPaymentMethod } = require('../models/paymentMethdsModel');
const {createPayment} = require('../models/paymentModel')

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

module.exports = {createPaymentForOrder} 