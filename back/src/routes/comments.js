import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentsController.js';

const router = express.Router();

// GET /api/comments - Récupérer tous les commentaires (PUBLIC)
router.get('/', getAllComments);

// GET /api/comments/:id - Récupérer un commentaire par ID (PUBLIC)
router.get('/:id', getCommentById);

// POST /api/comments - Créer un nouveau commentaire (PROTÉGÉ)
router.post('/', auth, createComment);

// PUT /api/comments/:id - Modifier un commentaire (PROTÉGÉ)
router.put('/:id', auth, updateComment);

// DELETE /api/comments/:id - Supprimer un commentaire (PROTÉGÉ)
router.delete('/:id', auth, deleteComment);

export default router;
