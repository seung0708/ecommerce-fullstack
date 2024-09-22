const {findUserByEmail, findUserById} = require ('../models/userModel');
const {register, login} = require('../controller/authController');
const express = require ('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
        try {
            const user = await findUserByEmail(email);
            if (!user) return done(null, false, { message: 'No user with that email' });
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch)
            if (passwordMatch) {
                const {password, ...userWithoutPassword} = user;
                return done(null, userWithoutPassword);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await findUserById(id);
  done(null, user);
});


//router.get('/', (req, res) => res.send('Auth route is working'));


router.post('/logout', (req, res, next) => {
    req.logout(err => {
        if(err) return next(err)
        
    });
    req.session.destroy(err => {
        if(err) return next(err)
    })
    res.clearCookie('connect.sid')
    res.status(200).json({message: 'Logged out successfully'});
})

router.post('/register', async (req, res) => {
    const role = req.body.role;
    try {
        if (role !== 'seller' && role !== 'customer') {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        const registeredUser = await register(req, res, role);

        if(registeredUser) {
            req.logIn(registeredUser, err => {
                if (err) {
                    return res.status(500).json({ error: 'Login after registration failed' });
                }
                return res.status(201).json({ msg: 'Register successful', role });
            });
        } 
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Registration failed'})
    }
})

router.post('/login', login);


module.exports =    router