// Logique de gestion des idees
import * as IdeaModel from '../models/Ideas.js';

// Recuperer toutes les idees avec pagination et tri
export const getAllIdeas = async (req, res) => {
  try {
    const { order, limit, offset } = req.query;
    
    // Prepare les donnees pour le modele
    const data = {};
    if (order) data.order = order;
    if (limit) data.limit = parseInt(limit);
    if (offset) data.offset = parseInt(offset);
    
    // Utilise le modele SQL de votre collegue avec les nouvelles options
    const ideas = await IdeaModel.getAll(data);
    
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
    
    // Utilise la nouvelle fonction findById de votre collègue !
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
    const { text } = req.body; // Seul le text est nécessaire dans le body
    const userId = req.user.id; // L'utilisateur vient du token JWT
    
    // Validation simple
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }
    
    // Utilise le modèle SQL de votre collègue
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
    const { text } = req.body; // On prend seulement text du body
    const userId = req.user.id; // L'utilisateur vient du token JWT

    // Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }

    // Utilise le modèle SQL de votre collègue
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
    
    // Utilise le modèle SQL de votre collègue
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
    
    // Utilise la fonction findByUserId du modèle SQL
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