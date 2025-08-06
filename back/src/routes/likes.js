import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllLikes,
  createLike,
  deleteLike,
  countLikes
} from '../controllers/likesController.js';

const router = express.Router();

// GET /api/likes - Récupérer tous les likes (PUBLIC)
router.get('/', getAllLikes);

// POST /api/likes - Ajouter un like (PROTÉGÉ)
router.post('/', auth, createLike);

// DELETE /api/likes - Supprimer un like (PROTÉGÉ)
router.delete('/', auth, deleteLike);

// GET /api/likes/count/:ideaId - Compter les likes d'une idée (PUBLIC)
router.get('/count/:ideaId', countLikes);

export default router;
