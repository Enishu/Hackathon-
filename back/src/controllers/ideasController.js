// Logique de gestion des idees
// Logique de gestion des idees
import * as IdeaModel from '../models/Ideas.js';

// Recuperer toutes les idees
// Recuperer toutes les idees avec pagination et tri
export const getAllIdeas = async (req, res) => {
  try {
    // Paramètres optionnels d'Hervé : order, limit, offset
    const { order, limit, offset } = req.query;
    
    // Validation des paramètres
    const data = {};
    if (order && ['ASC', 'DESC'].includes(order.toUpperCase())) {
      data.order = order.toUpperCase();
    }
    if (limit && parseInt(limit) > 0) {
      data.limit = parseInt(limit);
    }
    if (offset && parseInt(offset) >= 0) {
      data.offset = parseInt(offset);
    }
    
    // Utilise le modèle SQL d'Hervé avec les nouveaux paramètres
    const ideas = await IdeaModel.getAll(data);
    
    res.status(200).json({
      success: true,
      message: 'Idees recuperees avec succes',
      data: ideas,
      pagination: {
        order: data.order || 'DESC',
        limit: data.limit || 'all',
        offset: data.offset || 0
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des idees:', error);
    console.error('Erreur lors de la recuperation des idees:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des idees'
      message: 'Erreur serveur lors de la recuperation des idees'
    });
  }
};

// Recuperer une idee par ID
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
      message: 'Idee recuperee avec succes',
      data: idea
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation de l\'idee:', error);
    console.error('Erreur lors de la recuperation de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation de l\'idee'
      message: 'Erreur serveur lors de la recuperation de l\'idee'
    });
  }
};

// Creer une nouvelle idee 
// Creer une nouvelle idee 
export const createIdeas = async (req, res) => {
  try {
    const { text } = req.body; // Seulement le texte de l'idée
    const userId = req.user.id; // Recuperé du token JWT
    
    // Validation simple
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte de l\'idée est requis'
      });
    }
    
    // Utilise le modele SQL
    const result = await IdeaModel.create({ text, userId });
    
    res.status(201).json({
      success: true,
      message: 'Idée créée avec succes',
      message: 'Idée créée avec succes',
      data: { id: result.insertId, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'idee:', error);
    console.error('Erreur lors de la création de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'idee'
      message: 'Erreur serveur lors de la création de l\'idee'
    });
  }
};

// Modifier une idee
// Modifier une idee
export const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body; // Seulement le texte de l'idée
    const userId = req.user.id; // Recuperé du token JWT

    // Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte de l\'idée est requis'
      });
    }

    // Utilise le modele SQL
    const result = await IdeaModel.update({ text, userId, id });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idée non trouvée ou vous n\'etes pas autorise'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idée modifiée avec succes',
      message: 'Idée modifiée avec succes',
      data: { id, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'idee:', error);
    console.error('Erreur lors de la modification de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la modification de l\'idee'
      message: 'Erreur serveur lors de la modification de l\'idee'
    });
  }
};

// Supprimer une idee
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
      message: 'Idée supprimée avec succes'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'idee:', error);
    console.error('Erreur lors de la suppression de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'idee'
      message: 'Erreur serveur lors de la suppression de l\'idee'
    });
  }
};

// Recuperer les idees d'un utilisateur spécifique
// Recuperer les idees d'un utilisateur spécifique
export const getIdeasByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Utilise la fonction findByUserId du modele
    const ideas = await IdeaModel.findByUserId(userId);
    
    res.status(200).json({
      success: true,
      message: 'Idées de l\'utilisateur recuperées avec succes',
      message: 'Idées de l\'utilisateur recuperées avec succes',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des idees utilisateur:', error);
    console.error('Erreur lors de la recuperation des idees utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des idees utilisateur'
      message: 'Erreur serveur lors de la recuperation des idees utilisateur'
    });
  }
};
