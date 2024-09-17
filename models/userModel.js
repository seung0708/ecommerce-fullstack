const pool = require('./database');

const createUser = async(first_name, last_name, email, hashedPassword, created_at) => {
    return pool.query('INSERT INTO users (first_name, last_name, email, password, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *', [first_name, last_name, email, hashedPassword, created_at]);
}

const getRole = async (role) => {
    return pool.query('SELECT id FROM roles WHERE name =$1', [role]);
}

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]
}

const getIdByEmail = async (email) => {
    return pool.query('SELECT id FROM users WHERE email = $1', [email]);
}

const addToUserRoles = async (userId, roleId) => {
    return pool.query('INSERT INTO user_roles (user_id, role_id) VALUES($1, $2)', [userId, roleId]);
}



module.exports = {
    createUser,
    getRole, 
    addToUserRoles,
    findUserByEmail,
    getIdByEmail
}