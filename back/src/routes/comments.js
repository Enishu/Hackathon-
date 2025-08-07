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

// GET /api/comments - Recuperer tous les commentaires (PUBLIC)
router.get('/', getAllComments);

// GET /api/comments/:id - Recuperer un commentaire par ID (PUBLIC)
router.get('/:id', getCommentById);

// POST /api/comments - Creer un nouveau commentaire (PROTEGE)
router.post('/', auth, createComment);

// PUT /api/comments/:id - Modifier un commentaire (PROTEGE)
router.put('/:id', auth, updateComment);

// DELETE /api/comments/:id - Supprimer un commentaire (PROTEGE)
router.delete('/:id', auth, deleteComment);

export default router;
