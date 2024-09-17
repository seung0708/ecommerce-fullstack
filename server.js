require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const pool = require('./models/database');
const session = require('express-session');
const PostgreSQLStore = require('connect-pg-simple')(session);

const appSeller = express();
const appCustomer = express();
const CUSTOMER_PORT = process.env.CUSTOMER_PORT || 5000; 
const SELLER_PORT = process.env.SELLER_PORT || 5001;

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




const setUpApp = (app, role) => {
    app.use(cors());
    app.use(bodyParser.json());
    
    //Configure session
    app.use(session({
        store: new PostgreSQLStore({
            pool, 
            tableName: 'session'
        }),
        secret: process.env.SECRET_KEY, 
        resave: false, 
        saveUninitialized: false, 
        cookie: {maxAge: 1000 * 60 * 60 * 24} 
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use((req, res, next) => {
        req.role = role; 
        next();
    })

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/products', productRoutes);
    app.use('/seller', sellerRoutes);
    app.use('/carts', cartRoutes);
    app.use('/orders', orderRoutes);
    app.use('/payments', paymentRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/dummyjson', dummyjsonRoutes);
}



setUpApp(appCustomer, 'customer');
setUpApp(appSeller, 'seller');


appCustomer.listen(CUSTOMER_PORT, () => console.log(`Server is running on http://localhost:${CUSTOMER_PORT}`))
appSeller.listen(SELLER_PORT, () => console.log(`Server is running on http://localhost:${SELLER_PORT}`))

