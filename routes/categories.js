const express = require('express');
const router = express.Router();
const {fetchCategoriesFromDummyJson} = require('../models/categoryModel');

router.get('/', fetchCategoriesFromDummyJson);

module.exports = router;