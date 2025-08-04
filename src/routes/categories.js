const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categoriesController');

// GET Récupérer toutes les catégories
router.get('/', getAllCategories);

module.exports = router;