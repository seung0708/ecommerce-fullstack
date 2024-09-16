const pool = require('./database');

const createUser = async(email, password, firstName, lastName) => {
    console.log('createuser',email, password, firstName, lastName)
    return pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4)', [firstName, lastName, email, password]);
}

module.exports = {
    createUser
}