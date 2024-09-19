require('dotenv').config();


//Setting up the Express application
const cors = require('cors'); //import cors middleware
const passport = require('passport'); //importing passport middleware for authentication
const pool = require('./models/database'); //importing pool to connect to the database. 
const session = require('express-session'); //import sessions middleware 
const PostgreSQLStore = require('connect-pg-simple')(session); //setting up session store
const PORT = process.env.PORT || 5000; //setting up port for customer's website
const express = require('express'); //Importing express module
const app = express(); //initializing app to an instance of an Express application

//Setting up routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const sellerRoutes = require('./routes/sellers');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const categoryRoutes = require('./routes/categories');
const dummyjsonRoutes = require('./routes/dummyjson');
const cartItemRoutes = require('./routes/cartItems');


app.use(cors());
app.use(express.json());

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

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/seller', sellerRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/categories', categoryRoutes);
app.use('/dummyjson', dummyjsonRoutes);
app.use('/cartItems', cartItemRoutes);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
