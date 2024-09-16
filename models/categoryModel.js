const pool = require('./database');

//Getting all products from dummyjson
const fetchCategoriesFromDummyJson = async () => {
    const response = await fetch('https://dummyjson.com/products/category-list')
    const categories = await response.json();
    console.log(categories);
}

module.exports = {fetchCategoriesFromDummyJson};