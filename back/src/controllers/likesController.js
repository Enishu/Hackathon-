// Logique de gestion des likes
import * as LikeModel from '../models/Likes.js';

export const getAllLikes = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    
    // Le modele n'a pas de getAll par ideaId, mais on peut retourner le count
    res.status(200).json({
      success: true,
      message: 'Likes de l\'idee - voir avec les autres pour implémenter le count',
      ideaId: ideaId,
      info: {
        note: 'Le modèle n\'a pas de fonction pour lister les likes, seulement link/unlink'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des likes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recuperation des likes'
    });
  }
};

export const createLike = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    const userId = req.user.id; // Recuperé du token JWT
    
    // Utilise le modele Likes (link = aimer)
    try {
      await LikeModel.link({ ideaId, userId });
      
      res.status(201).json({
        success: true,
        message: 'Like ajouté avec succes',
        data: { ideaId, userId }
      });
    } catch (error) {
      // Si erreur de contrainte unique (like déjà existant)
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Vous avez déjà aimé cette idee'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du like:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'ajout du like'
    });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    const userId = req.user.id; // Recuperé du token JWT
    
    // Utilise le modele Likes (unlink = ne plus aimer)
    const result = await LikeModel.unlink({ ideaId, userId });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Like non trouvé ou déjà supprimé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Like supprimé avec succes'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du like:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du like'
    });
  }
};

export const countLikes = async (req, res) => {
  try {
    const { ideaId } = req.params; // Maintenant on prend depuis les paramètres de route
    
    // Le modele n'a pas de fonction count, voir avec l'equipe si on veut l'ajouter
    // ou bien faire un SELECT COUNT(*) FROM likes WHERE idea_id = ?
    
    res.status(200).json({
      success: true,
      message: 'Fonction count pas encore implementee - voir avec l\'equipe pour ajouter au modele',
      ideaId: ideaId,
      info: 'Le modèle Likes a seulement link() et unlink() pour l\'instant'
    });
  } catch (error) {
    console.error('Erreur lors du comptage des likes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du comptage des likes'
    });
  }
};
