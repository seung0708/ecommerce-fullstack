require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000; 
const session = require('express-session');

app.use(bodyParser.json());

//Configure session
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {secure: true , maxAge: 1000 * 60 * 60 * 24}
}))

//Setting up Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const sellerRoutes = require('./routes/sellers');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const categoryRoutes = require('./routes/categories');
const dummyjsonRoutes = require('./routes/dummyjson');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/seller', sellerRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/categories', categoryRoutes);
app.use('/dummyjson', dummyjsonRoutes);


app.listen(PORT, () => console.log(`Server is running on http://locatlhost:${PORT}`))

