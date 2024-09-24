const bcrypt = require('bcryptjs');
const passport = require('passport');
const {createUser, getRole, addToUserRoles, findUserByEmail} = require('../models/userModel');

const register = async(req, res, role) => {
    const {firstName, lastName, email, password, created_at = new Date()} = req.body;
    //console.log(req.body)

    try {
        let user;
        let userId;
        let userExists = await findUserByEmail(email);
        //if user doesn't exist
        if(!userExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await createUser(firstName, lastName, email, hashedPassword, created_at);
            userId = user.id;
        } else {
            res.status(401).json({message: 'User is already registered'})
        }
        console.log(user, userId)
        const roleName = await getRole(role);
        const roleId = roleName.rows[0].id; 

        if (userId && roleId) {
            await addToUserRoles(userId, roleId)
        } 
        res.status(200).json(user);
       
    } catch(error) {
         res.status(500).json({error: 'Error registering user'});
    }
}
 
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        req.session.user = req.user;
        if (err) return next(err)
        if(!user) return res.status(401).json({message: 'Login failed'});
        req.logIn(user, (err) => {
            if(err) return next(err);

            res.status(200).json(user);
        })
    })(req, res, next);

} 

const logout = (req, res, next) => {
    req.logout(err => {
        if(err) return next(err)
        req.session.user = null; 
        res.clearCookie('connect.sid')
        res.status(200).json({message: 'Logged out successfully'})
    });
}

module.exports = {
    register,
    login,
    logout
}
 
