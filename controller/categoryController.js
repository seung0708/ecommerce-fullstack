const { fetchCategories } = require("../models/categoryModel")


const getCategories = async (req, res) => {
    const {name} = req.body
    const category = await fetchCategories(name);
    return category;
}

module.exports = {getCategories}