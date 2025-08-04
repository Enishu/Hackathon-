const { categories } = require('../models/data');

// Récupérer toutes les catégories
const getAllCategories = (req, res) => {
  res.json({
    success: true,
    data: categories
  });
};

module.exports = {
  getAllCategories
};
