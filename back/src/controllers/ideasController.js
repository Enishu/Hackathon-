// Logique de gestion des idees
import * as IdeaModel from '../models/Ideas.js';

// Recuperer toutes les idees avec pagination et tri
export const getAllIdeas = async (req, res) => {
  try {
    // Parametres optionnels d'Herve : order, limit, offset
    const { order, limit, offset } = req.query;
    
    // Validation des parametres
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
    
    // Utilise le modele SQL avec les nouvelles options
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
    
    // Utilise la fonction findById du modele SQL
    const idea = await IdeaModel.findById(id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idee non trouvee'
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
    const { text } = req.body; // Seul le text est necessaire dans le body
    const userId = req.user.id; // L'utilisateur vient du token JWT
    
    // Validation simple
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }
    
    // Utilise le modele SQL
    const result = await IdeaModel.create({ text, userId });
    
    res.status(201).json({
      success: true,
      message: 'Idee creee avec succes',
      data: { id: result.insertId, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la creation de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la creation de l\'idee'
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

    // Utilise le modele SQL
    const result = await IdeaModel.update({ text, userId, id });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idee non trouvee ou vous n\'etes pas autorise'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idee modifiee avec succes',
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
    
    // Utilise le modele SQL
    const result = await IdeaModel.remove(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Idee non trouvee'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Idee supprimee avec succes'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'idee:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'idee'
    });
  }
};

// Recuperer les idees d'un utilisateur specifique
export const getIdeasByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Utilise la fonction findByUserId du modele SQL
    const ideas = await IdeaModel.findByUserId(userId);
    
    res.status(200).json({
      success: true,
      message: 'Idees de l\'utilisateur recuperees avec succes',
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
