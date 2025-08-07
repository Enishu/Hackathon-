// Logique de gestion des idees
import * as IdeaModel from '../models/Ideas.js';

// Recuperer toutes les idees
export const getAllIdeas = async (req, res) => {
  try {
    // Utilise le modele SQL
    const ideas = await IdeaModel.getAll();
    
    res.status(200).json({
      success: true,
      message: 'Idees recuperees avec succes',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des idees:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des idees'
    });
  }
};

// Recuperer une idee par ID
export const getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Utilise la fonction findById
    const idea = await IdeaModel.findById(id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idee recuperee avec succes',
      data: idea
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation de l\'idee'
    });
  }
};

// Creer une nouvelle idee 
export const createIdeas = async (req, res) => {
  try {
    const { text, userId } = req.body; // Correspond au modele (text, userId)
    
    // Validation simple
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'ID utilisateur sont requis'
      });
    }
    
    // Utilise le modele SQL
    const result = await IdeaModel.create({ text, userId });
    
    res.status(201).json({
      success: true,
      message: 'Idée créée avec succes',
      data: { id: result.insertId, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'idee'
    });
  }
};

// Modifier une idee
export const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, userId } = req.body; // Correspond au modele

    // Validation
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'ID utilisateur sont requis'
      });
    }

    // Utilise le modele SQL
    const result = await IdeaModel.update({ text, userId, id });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idée modifiée avec succes',
      data: { id, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la modification de l\'idee'
    });
  }
};

// Supprimer une idee
export const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Utilise le modele
    const result = await IdeaModel.remove(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idée supprimée avec succes'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'idee'
    });
  }
};

// Recuperer les idees d'un utilisateur spécifique
export const getIdeasByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Utilise la fonction findByUserId du modele
    const ideas = await IdeaModel.findByUserId(userId);
    
    res.status(200).json({
      success: true,
      message: 'Idées de l\'utilisateur recuperées avec succes',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des idees utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des idees utilisateur'
    });
  }
};
