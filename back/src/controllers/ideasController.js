// Logique de gestion des idées 
import * as IdeaModel from '../models/Ideas.js';

// Récupérer toutes les idées
export const getAllIdeas = async (req, res) => {
  try {
    // ✅ Utilise le modèle SQL de votre collègue
    const ideas = await IdeaModel.getAll();
    
    res.status(200).json({
      success: true,
      message: 'Idées récupérées avec succès',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des idées:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des idées'
    });
  }
};

// Récupérer une idée par ID
export const getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ On va créer cette fonction car elle n'existe pas dans le modèle
    // Pour l'instant on utilise getAll et on filtre (pas optimal mais fonctionnel)
    const allIdeas = await IdeaModel.getAll();
    const idea = allIdeas.find(idea => idea.id == id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idée récupérée avec succès',
      data: idea
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'idée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de l\'idée'
    });
  }
};

// Créer une nouvelle idée 
export const createIdeas = async (req, res) => {
  try {
    const { text, userId } = req.body; // ✅ Correspond au modèle SQL (text, userId)
    
    // ✅ Validation simple
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'ID utilisateur sont requis'
      });
    }
    
    // ✅ Utilise le modèle SQL de votre collègue
    const result = await IdeaModel.create({ text, userId });
    
    res.status(201).json({
      success: true,
      message: 'Idée créée avec succès',
      data: { id: result.insertId, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'idée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'idée'
    });
  }
};

// Modifier une idée
export const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, userId } = req.body; // ✅ Correspond au modèle SQL

    // ✅ Validation
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'ID utilisateur sont requis'
      });
    }

    // ✅ Utilise le modèle SQL de votre collègue
    const result = await IdeaModel.update({ text, userId, id });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idée modifiée avec succès',
      data: { id, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'idée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la modification de l\'idée'
    });
  }
};

// Supprimer une idée
export const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ Utilise le modèle SQL de votre collègue
    const result = await IdeaModel.remove(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idée supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'idée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'idée'
    });
  }
};

// ✅ BONUS: Récupérer les idées d'un utilisateur spécifique
export const getIdeasByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // ✅ Utilise la fonction findByUserId du modèle SQL
    const ideas = await IdeaModel.findByUserId(userId);
    
    res.status(200).json({
      success: true,
      message: 'Idées de l\'utilisateur récupérées avec succès',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des idées utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des idées utilisateur'
    });
  }
};