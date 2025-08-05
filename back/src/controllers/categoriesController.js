import { categories } from '../models/data.js';

// Récupérer toutes les catégories
const getAllCategories = (req, res) => {
  try {
    res.json({
      success: true,
      data: categories,
      total: categories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des catégories'
    });
  }
};

export {
  getAllCategories
};
