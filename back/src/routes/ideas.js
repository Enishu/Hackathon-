import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllIdeas, 
  getIdeaById,
  createIdeas,
  updateIdea,
  deleteIdea,
  getIdeasByUser  // ✅ Nouvelle fonction
} from '../controllers/ideasController.js';

const router = express.Router();

// GET /api/ideas - Récupérer toutes les idées (PUBLIC)
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Récupérer une idée par ID (PUBLIC)
router.get('/:id', getIdeaById);

// POST /api/ideas - Créer une nouvelle idée (PROTÉGÉ)
router.post('/', auth, createIdeas);

// PUT /api/ideas/:id - Modifier une idée (PROTÉGÉ)
router.put('/:id', auth, updateIdea);

// DELETE /api/ideas/:id - Supprimer une idée (PROTÉGÉ)
router.delete('/:id', auth, deleteIdea);

// GET /api/ideas/user/:userId - Récupérer les idées d'un utilisateur (PUBLIC)
router.get('/user/:userId', getIdeasByUser);

export default router;