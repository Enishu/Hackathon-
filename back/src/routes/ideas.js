import express from 'express';
import { 
  getAllIdeas, 
  getIdeaById, 
  createIdea, 
  updateIdea, 
  deleteIdea 
} from '../controllers/ideasController.js';

const router = express.Router();

// GET /api/ideas - Récupérer toutes les idées (avec pagination)
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Récupérer une idée par son ID
router.get('/:id', getIdeaById);

// POST /api/ideas - Créer une nouvelle idée
router.post('/', createIdea);

// PUT /api/ideas/:id - Mettre à jour une idée (pour plus tard)
router.put('/:id', updateIdea);

// DELETE /api/ideas/:id - Supprimer une idée (pour plus tard)
router.delete('/:id', deleteIdea);

export default router;
