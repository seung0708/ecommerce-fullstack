const bcrypt = require('bcryptjs');
const passport = require('passport');
const {createUser} = require('../models/userModel');

const register = async(req, res) => {
    const {email, password, first_name, last_name} = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, hashedPassword, first_name, last_name);
        console.log(user)
    // try {
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await createUser(email, hashedPassword, firstName, lastName);
    //     console.log(user)
    //     if (user) {
    //         res.status(201).json({
    //             message: 'User registered'
    //         })
    //     }
    // } catch(error) {
    //     res.status(500).json({error: 'Error registering user'});
    // }
}

module.exports = {
    register
}

