// Logique de gestion des idees
import * as IdeaModel from '../models/Ideas.js';
import * as CategoryModel from '../models/Categories.js';
import * as IdeaCategoryModel from '../models/IdeaCategory.js';
import * as LikeModel from '../models/Likes.js';
import * as CommentModel from '../models/Comments.js';

// Recuperer toutes les idees avec pagination et tri
export const getAllIdeas = async (req, res) => {
  try {
    // Parametres optionnels d'Herve : order, limit, offset
    const { order, limit, offset, category_ids } = req.query;
    
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
    if (category_ids) data.categoryIds=category_ids
    
    // Utilise le modele SQL avec les nouvelles options
    const ideas = await IdeaModel.getAll(data);
    
    // Enrichir chaque idée avec les compteurs de likes et commentaires
    const enrichedIdeas = await Promise.all(
      ideas.map(async (idea) => {
        // Récupérer le nombre de likes (avec gestion d'erreur)
        let likesCount = 0;
        try {
          likesCount = await LikeModel.countByIdeaId(idea.id) || 0;
        } catch (error) {
          console.warn(`Erreur lors du comptage des likes pour l'idée ${idea.id}:`, error);
        }
        
        // Récupérer le nombre de commentaires
        let commentsCount = 0;
        try {
          const comments = await CommentModel.findByIdeaId(idea.id);
          commentsCount = comments ? comments.length : 0;
        } catch (error) {
          console.warn(`Erreur lors du comptage des commentaires pour l'idée ${idea.id}:`, error);
        }
        
        return {
          ...idea,
          likesCount,
          commentsCount
        };
      })
    );
    
    res.status(200).json({
      success: true,
      message: 'Idees recuperees avec succes',
      data: enrichedIdeas
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
    const { text, categories = [] } = req.body; // text et categories dans le body
    const userId = req.user.id; // L'utilisateur vient du token JWT
    
    // Validation simple
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }
    
    // Validation des catégories (optionnel)
    if (categories && !Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: 'Les catégories doivent être un tableau de chaînes'
      });
    }
    
    // 1. Créer l'idée d'abord
    const ideaResult = await IdeaModel.create({ text, userId });
    const ideaId = ideaResult.insertId;
    
    // 2. Si des catégories sont fournies, les associer à l'idée
    if (categories && categories.length > 0) {
      // Récupérer toutes les catégories existantes
      const allCategories = await CategoryModel.getAll();
      
      // Filtrer les catégories qui existent et récupérer leurs IDs
      const validCategoryIds = [];
      for (const categoryName of categories) {
        const existingCategory = allCategories.find(cat => cat.name === categoryName);
        if (existingCategory) {
          validCategoryIds.push(existingCategory.id);
        }
      }
      
      // Créer les liaisons idée-catégorie
      for (const categoryId of validCategoryIds) {
        await IdeaCategoryModel.link({ ideaId, categoryId });
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Idee creee avec succes',
      data: { id: ideaId, text, userId, categories: categories || [] }
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
