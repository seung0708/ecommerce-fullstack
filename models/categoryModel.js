const pool = require('./database');

//Getting all products from dummyjson
const fetchCategoriesFromDummyJson = async () => {
    const response = await fetch('https://dummyjson.com/products/category-list')
    const categories = await response.json();
    console.log(categories);
}

const fetchCategoriesById = async (name) => {
    const result = await pool.query('SELECT id FROM categories WHERE name = $1', [name]);
    return result.rows[0].id;
}

module.exports = {
    fetchCategoriesFromDummyJson,
    fetchCategoriesById
};