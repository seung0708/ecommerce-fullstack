const express = require('express');
const router = express.Router();
const {fetchCategoriesFromDummyJson} = require('../models/categoryModel');
const {getCategories} = require('../controller/categoryController');

//router.get('/', fetchCategoriesFromDummyJson);
router.get('/', getCategories)

module.exports = router;