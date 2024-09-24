const pool = require('./database');

const createUser = async(firstName, lastName, email, hashedPassword, created_at) => {
    const result = await pool.query('INSERT INTO users (first_name, last_name, email, password, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, hashedPassword, created_at]);
    return result.rows[0]
}

const getRole = async (role) => {
    return await pool.query('SELECT id FROM roles WHERE name =$1', [role]);
}

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]
}

async function findUserById(id) {
    return await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = $1', [id]);
    
  }

const addToUserRoles = async (userId, roleId) => {
    return await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES($1, $2)', [userId, roleId]);
}



module.exports = {
    createUser,
    getRole, 
    addToUserRoles,
    findUserByEmail,
    findUserById
}