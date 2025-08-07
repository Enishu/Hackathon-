import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllIdeas, 
  getIdeaById,
  createIdeas,
  updateIdea,
  deleteIdea,
  getIdeasByUser  // Nouvelle fonction
} from '../controllers/ideasController.js';

// Import des controllers pour les sous-routes
import { 
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentsController.js';

import { 
  getAllLikes,
  createLike,
  deleteLike,
  countLikes
} from '../controllers/likesController.js';

const router = express.Router();

// GET /api/ideas - Recuperer toutes les idees (PUBLIC)
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Recuperer une idee par ID (PUBLIC)
router.get('/:id', getIdeaById);

// POST /api/ideas - Creer une nouvelle idee (PROTEGE)
router.post('/', auth, createIdeas);

// PUT /api/ideas/:id - Modifier une idee (PROTEGE)
router.put('/:id', auth, updateIdea);

// DELETE /api/ideas/:id - Supprimer une idee (PROTEGE)
router.delete('/:id', auth, deleteIdea);

// GET /api/ideas/user/:userId - Recuperer les idees d'un utilisateur (PUBLIC)
router.get('/user/:userId', getIdeasByUser);

// ========== SOUS-ROUTES COMMENTS ==========
// GET /api/ideas/:ideaId/comments - Recuperer tous les commentaires d'une idee (PUBLIC)
router.get('/:ideaId/comments', getAllComments);

// POST /api/ideas/:ideaId/comments - Ajouter un commentaire a une idee (PROTEGE)
router.post('/:ideaId/comments', auth, createComment);

// PUT /api/ideas/:ideaId/comments/:commentId - Modifier un commentaire (PROTEGE)
router.put('/:ideaId/comments/:commentId', auth, updateComment);

// DELETE /api/ideas/:ideaId/comments/:commentId - Supprimer un commentaire (PROTEGE)
router.delete('/:ideaId/comments/:commentId', auth, deleteComment);

// ========== SOUS-ROUTES LIKES ==========
// GET /api/ideas/:ideaId/likes - Recuperer tous les likes d'une idee (PUBLIC)
router.get('/:ideaId/likes', getAllLikes);

// POST /api/ideas/:ideaId/likes - Liker une idee (PROTEGE)
router.post('/:ideaId/likes', auth, createLike);

// DELETE /api/ideas/:ideaId/likes - Unliker une idee (PROTEGE)
router.delete('/:ideaId/likes', auth, deleteLike);

// GET /api/ideas/:ideaId/likes/count - Compter les likes d'une idee (PUBLIC)
router.get('/:ideaId/likes/count', countLikes);

export default router;