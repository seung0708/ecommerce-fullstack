const bcrypt = require('bcryptjs');
const passport = require('passport');
const {createUser, getRole, addToUserRoles, findUserByEmail, getIdByEmail} = require('../models/userModel');

const register = async(req, res, role) => {
    const {first_name, last_name, email, password, created_at = new Date()} = req.body;
    try {
        let user;
        let userId;
        let userExists = await findUserByEmail(email);
        //if user doesn't exist
        if(!userExists?.email) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await createUser(first_name, last_name, email, hashedPassword, created_at);
            userId = user.rows[0].id;
        } else {
            user = await getIdByEmail(email)
            userId = user.rows[0].id;
        }
        const roleName = await getRole(role);
        const roleId = roleName.rows[0].id; 

        if (userId && roleId) {
            await addToUserRoles(userId, roleId)
        } 
        return user;
       
    } catch(error) {
        res.status(500).json({error: 'Error registering user'});
    }
}
 
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if(!user) return res.status(401).json({message: 'Login failed'});
        req.logIn(user, (err) => {
            if(!err) {
                res.status(200).json({messge: 'Logged in successfully', user})
            } else {
                return next(err);
            }
        })
    })(req, res, next);

} 

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ error: 'Not authenticated' });
    }
};

const isSeller = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const user = await findUserById(req.user.id); 
            if (user && user.role === 'seller') {
                return next();
            }
            return res.status(403).json({ error: 'Forbidden. Seller role required.' });
        } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
};

module.exports = {
    register,
    login
}
 
