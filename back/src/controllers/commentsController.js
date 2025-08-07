// Logique de gestion des commentaires
import * as CommentModel from '../models/Comments.js';

export const getAllComments = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    
    // Récupère tous les commentaires d'une idee spécifique
    const comments = await CommentModel.findByIdeaId(ideaId);
    
    res.status(200).json({
      success: true,
      message: 'Commentaires de l\'idee recuperés avec succes',
      data: comments
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des commentaires:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des commentaires'
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    // Le modèle d'Hervé n'a pas de findById, voir avec les autres si nécessaire
    // pour l'instant on peut utiliser findByIdeaId ou findByUserId selon le besoin
    
    res.status(200).json({
      success: true,
      message: 'Fonction getCommentById pas encore implémentée - voir avec Hervé pour ajouter findById au modèle',
      info: 'Utilisez GET /comments?ideaId=X pour recuperer les commentaires d\'une idee'
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation du commentaire'
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    const { text } = req.body; // text au lieu de content (modèle d'Hervé)
    const userId = req.user.id; // Recuperé du token JWT
    
    // Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte du commentaire est requis'
      });
    }
    
    // Utilise le modèle Comments d'Hervé
    const result = await CommentModel.create({ text, ideaId, userId });
    
    res.status(201).json({
      success: true,
      message: 'Commentaire créé avec succes',
      data: { id: result.insertId, text, ideaId, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du commentaire'
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { ideaId, commentId } = req.params; // Maintenant on prend depuis les paramètres de route
    const { text } = req.body; // text au lieu de content
    const userId = req.user.id; // Recuperé du token JWT
    
    // Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }
    
    // Utilise le modèle Comments d'Hervé
    const result = await CommentModel.update({ text, ideaId, userId, id: commentId });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Commentaire non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commentaire modifié avec succes',
      data: { id, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la modification du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la modification du commentaire'
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params; // Maintenant on prend depuis les paramètres de route
    // Note: userId pourrait servir pour vérifier que l'utilisateur supprime son propre commentaire
    // voir avec les autres si on veut ajouter cette sécurité
    
    // Utilise le modèle Comments d'Hervé
    const result = await CommentModel.remove(commentId);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Commentaire non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commentaire supprimé avec succes'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du commentaire'
    });
  }
};

// Recuperer les commentaires d'un utilisateur
export const getCommentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Utilise la fonction findByUserId du modèle
    const comments = await CommentModel.findByUserId(userId);
    
    res.status(200).json({
      success: true,
      message: 'Commentaires de l\'utilisateur recuperés avec succes',
      data: comments
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des commentaires utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des commentaires utilisateur'
    });
  }
};
