const {findUserByEmail} = require ('../models/userModel');
const {register, login} = require('../controller/authController');
const express = require ('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());



passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
        try {
            const user = await findUserByEmail(email);
            if (!user) return done(null, false, { message: 'No user with that email' });
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch)
            if (passwordMatch) return done(null, user);
            else return done(null, false, { message: 'Password incorrect' });
        } catch (err) {
        return done(err);
    }}
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await findUserById(id);
  done(null, user);
});




router.get('/', (req, res) => res.send('Auth route is working'));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
router.post('/register', async (req, res) => {
    let registeredUser;
    const role = req.role;
    if(role === 'seller') {
        registeredUser = await register(req, res, 'seller');
    } else if (role === 'customer') {
        registeredUser = await register(req, res, 'customer');
    } else {
        res.status(400).json({error: 'Invalid role specified'});
    }
    console.log(user)
});

router.post('/login', login);


module.exports = router;