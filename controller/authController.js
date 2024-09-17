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
        if(!userExists.rows[0].email) {
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
            res.status(201).json({message: 'User registered successfully'})
        } else {
             res.status(500).json({error: 'Error registering user'});
        }
       
    } catch(error) {
        res.status(500).json({error: 'Error registering user'});
    }
}

module.exports = {
    register
}
 
