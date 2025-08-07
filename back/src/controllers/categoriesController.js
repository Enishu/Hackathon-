// Logique de gestion des categories
import * as CategoryModel from '../models/Categories.js';

export const getAllCategories = async (req, res) => {
  try {
    // Utilise le modele Categories
    const categories = await CategoryModel.getAll();
    
    res.status(200).json({
      success: true,
      message: 'Catégories recuperées avec succes',
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des categories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des categories'
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Pour l'instant on utilise getAll et on filtre (le modèle n'a pas findById)
    const allCategories = await CategoryModel.getAll();
    const category = allCategories.find(cat => cat.id == id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Catégorie recuperée avec succes',
      data: category
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation de la categorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation de la categorie'
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, iconUrl } = req.body; // iconUrl comme dans le modele
    
    // Validation simple
    if (!name || !iconUrl) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et l\'URL de l\'icône sont requis'
      });
    }
    
    // D'apres le modele Categories
    const result = await CategoryModel.create({ name, iconUrl });
    
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succes',
      data: { id: result.insertId, name, iconUrl }
    });
  } catch (error) {
    console.error('Erreur lors de la création de la categorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de la categorie'
    });
  }
};
