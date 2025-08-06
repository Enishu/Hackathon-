import express from 'express';
import { 
  getAllIdeas, 
  getIdeaById, 
  createIdea, 
  toggleLike,
  getComments,
  addComment
} from '../controllers/ideasController.js';

const router = express.Router();

// GET /api/ideas - Récupérer toutes les idées (avec pagination)
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Récupérer une idée par son ID
router.get('/:id', getIdeaById);

// POST /api/ideas - Créer une nouvelle idée
router.post('/', createIdea);

// POST /api/ideas/:id/like - Toggle like/unlike automatique
router.post('/:id/like', toggleLike);

// GET /api/ideas/:id/comments - Récupérer les commentaires d'une idée
router.get('/:id/comments', getComments);

// POST /api/ideas/:id/comments - Ajouter un commentaire à une idée
router.post('/:id/comments', addComment);

export default router;