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
            if(err) return next(err);

            res.status(200).json({message: 'Logged in successfully', user});
        })
    })(req, res, next);

} 

const logout = (req, res, next) => {
    req.logout(err => {
        if(err) return next(err)
        
    });
    req.session.destroy(err => {
        if(err) return next(err)
        res.clearCookie('connect.sid')
        res.status(200).json({message: 'Logged out successfully'})
    })
}

module.exports = {
    register,
    login,
    logout
}
 
