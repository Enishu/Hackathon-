import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllLikes,
  createLike,
  deleteLike,
  countLikes
} from '../controllers/likesController.js';

const router = express.Router();

// GET /api/likes - Recuperer tous les likes (PUBLIC)
router.get('/', getAllLikes);

// POST /api/likes - Ajouter un like (PROTEGE)
router.post('/', auth, createLike);

// DELETE /api/likes - Supprimer un like (PROTEGE)
router.delete('/', auth, deleteLike);

// GET /api/likes/count/:ideaId - Compter les likes d'une idee (PUBLIC)
router.get('/count/:ideaId', countLikes);

export default router;
