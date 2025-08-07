// Routes simples pour associer idees et categories
import express from 'express';
import * as IdeaCategoryModel from '../models/IdeaCategory.js';

const router = express.Router();

// POST /api/idea-categories/:ideaId/:categoryId - Associer une idee a une categorie
router.post('/:ideaId/:categoryId', async (req, res) => {
  try {
    const { ideaId, categoryId } = req.params;
    
    // Utilise directement le modele IdeaCategory
    await IdeaCategoryModel.link({ ideaId, categoryId });
    
    res.status(200).json({
      success: true,
      message: 'Idee associee a la categorie',
      data: { ideaId, categoryId }
    });
  } catch (error) {
    console.error('Erreur association:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'association'
    });
  }
});

// DELETE /api/idea-categories/:ideaId/:categoryId - Dissocier une idee d'une categorie
router.delete('/:ideaId/:categoryId', async (req, res) => {
  try {
    const { ideaId, categoryId } = req.params;
    
    // Utilise directement le modele IdeaCategory
    const result = await IdeaCategoryModel.unlink({ ideaId, categoryId });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Association non trouvee'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idee dissociee de la categorie'
    });
  } catch (error) {
    console.error('Erreur dissociation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la dissociation'
    });
  }
});

export default router;
