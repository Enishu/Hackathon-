import 
import Joi from 'joi';

// Validation simple
const ideaSchema = Joi.object({
  description: Joi.string().min(10).max(500).required(),
  userId: Joi.number().integer().positive().required()
});

// Récupérer toutes les idées
export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await db.getIdeas();
    res.json({
      success: true,
      data: ideas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des idées'
    });
  }
};

// Récupérer une idée par ID
export const getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await db.getIdeaById(parseInt(id));
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idée non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: idea
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'idée'
    });
  }
};

// Créer une nouvelle idée
export const createIdea = async (req, res) => {
  try {
    const { error, value } = ideaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Données invalides',
        details: error.details.map(d => d.message)
      });
    }
    
    const { description, userId } = value;
    
    const ideaId = await db.createIdea(description, userId);
    const newIdea = await db.getIdeaById(ideaId);
    
    res.status(201).json({
      success: true,
      data: newIdea,
      message: 'Idée créée avec succès'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de l\'idée'
    });
  }
};

// Supprimer une idée si Admin ou auteur
export const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 1; // Simuler un utilisateur connecté
    
    // Vérifier si l'utilisateur est admin ou auteur de l'idée
    const idea = await db.getIdeaById(parseInt(id));
    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idée non trouvée'
      });
    }

    // Vérifier si l'utilisateur est admin ou auteur de l'idée
    if (userId !== idea.userId && !isAdmin(userId)) {
      return res.status(403).json({
        success: false,
        error: 'Accès refusé'
      });
    }

    await db.deleteIdea(parseInt(id));
    res.json({
      success: true,
      message: 'Idée supprimée avec succès'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de l\'idée'
    });
  }
};



// Toggle like/unlike
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 1;
    
    const result = await db.toggleLike(parseInt(id), userId);
    const updatedIdea = await db.getIdeaById(parseInt(id));
    
    res.json({
      success: true,
      data: updatedIdea,
      message: result.action === 'added' ? 'Idée likée avec succès' : 'Like retiré avec succès',
      isLiked: result.isLiked
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du toggle du like'
    });
  }
};

// Récupérer les commentaires d'une idée
export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await db.getComments(parseInt(id));
    
    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des commentaires'
    });
  }
};

// Ajouter un commentaire
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, userId } = req.body;
    
    if (!content || content.trim().length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Le contenu du commentaire est requis'
      });
    }
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'L\'utilisateur est requis'
      });
    }
    
    const commentId = await db.addComment(parseInt(id), userId, content.trim());
    const comments = await db.getComments(parseInt(id));
    const newComment = comments.find(c => c.id === commentId);
    
    res.status(201).json({
      success: true,
      data: newComment,
      message: 'Commentaire ajouté avec succès'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'ajout du commentaire'
    });
  }
};
