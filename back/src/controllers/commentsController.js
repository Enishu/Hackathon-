// Logique de gestion des commentaires
export const getAllComments = async (req, res) => {
  try {
    const { ideaId } = req.query;
    
    // TODO: Implémenter la récupération des commentaires
    // if (ideaId) {
    //   const comments = await CommentModel.getCommentsByIdeaId(ideaId);
    // } else {
    //   const comments = await CommentModel.getAllComments();
    // }
    
    res.status(200).json({
      success: true,
      message: 'Commentaires récupérés avec succès',
      data: [] // TODO: remplacer par les vraies données
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des commentaires'
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Implémenter la récupération d'un commentaire par ID
    // const comment = await CommentModel.getCommentById(id);
    
    // TODO: Vérifier si le commentaire existe
    // if (!comment) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Commentaire non trouvé'
    //   });
    // }
    
    res.status(200).json({
      success: true,
      message: 'Commentaire récupéré avec succès',
      data: {} // TODO: remplacer par les vraies données
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du commentaire'
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, ideaId } = req.body;
    const userId = req.user.id; // Récupéré du token JWT
    
    // TODO: Validation des données
    // if (!content || !ideaId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Content et ideaId sont requis'
    //   });
    // }
    
    // TODO: Créer le commentaire en base de données
    // const newComment = await CommentModel.createComment({
    //   content,
    //   userId,
    //   ideaId
    // });
    
    res.status(201).json({
      success: true,
      message: 'Commentaire créé avec succès',
      data: {} // TODO: remplacer par les vraies données
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
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Récupéré du token JWT
    
    // TODO: Vérifier si le commentaire existe ET appartient à l'utilisateur
    // const existingComment = await CommentModel.getCommentById(id);
    // if (!existingComment) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Commentaire non trouvé'
    //   });
    // }
    // if (existingComment.userId !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Vous ne pouvez modifier que vos propres commentaires'
    //   });
    // }
    
    // TODO: Mettre à jour le commentaire
    // const updatedComment = await CommentModel.updateComment(id, { content });
    
    res.status(200).json({
      success: true,
      message: 'Commentaire modifié avec succès',
      data: {} // TODO: remplacer par les vraies données
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
    const { id } = req.params;
    const userId = req.user.id; // Récupéré du token JWT
    
    // TODO: Vérifier si le commentaire existe ET appartient à l'utilisateur
    // const existingComment = await CommentModel.getCommentById(id);
    // if (!existingComment) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Commentaire non trouvé'
    //   });
    // }
    // if (existingComment.userId !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Vous ne pouvez supprimer que vos propres commentaires'
    //   });
    // }
    
    // TODO: Supprimer le commentaire
    // await CommentModel.deleteComment(id);
    
    res.status(200).json({
      success: true,
      message: 'Commentaire supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du commentaire'
    });
  }
};
