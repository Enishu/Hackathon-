import express from 'express';
import { verifyAuthToken } from '../middlewares/verifyAuthToken.js';
import { 
  getAllIdeas, 
  getIdeaById,
  createIdeas,
  updateIdea,
  deleteIdea,
  getIdeasByUser
} from '../controllers/ideasController.js';

// Import des routes modulaires pour les sous-routes
import commentsRoutes from './comments.js';
import likesRoutes from './likes.js';

const router = express.Router();

// Routes principales des idées
// GET /api/ideas - Recuperer toutes les idees (PUBLIC)
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Recuperer une idee par ID (PUBLIC)
router.get('/:id', getIdeaById);

// POST /api/ideas - Creer une nouvelle idee (PROTEGE)
router.post('/', verifyAuthToken, createIdeas);

// PUT /api/ideas/:id - Modifier une idee (PROTEGE)
router.put('/:id', verifyAuthToken, updateIdea);

// DELETE /api/ideas/:id - Supprimer une idee (PROTEGE)
router.delete('/:id', verifyAuthToken, deleteIdea);

// GET /api/ideas/user/:userId - Recuperer les idees d'un utilisateur (PUBLIC)
router.get('/user/:userId', getIdeasByUser);

// Sous-routes modulaires comme suggéré par Hervé
router.use('/:ideaId/comments', commentsRoutes);
router.use('/:ideaId/likes', likesRoutes);

export default router;