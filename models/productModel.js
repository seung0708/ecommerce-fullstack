const pool = require('./database');

const createProduct = async (name, description, price, quantity) => {

}

const getAllProducts = async () => {
    return pool.query('SELECT name, price, description')
}

module.exports = {};