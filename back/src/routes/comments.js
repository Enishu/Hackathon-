// Routes pour les commentaires des idees
import express from 'express';
import * as commentsController from '../controllers/commentsController.js';
import { verifyAuthToken } from '../middlewares/verifyAuthToken.js';

const router = express.Router({ mergeParams: true });

// GET /:ideaId/comments - Récupérer tous les commentaires d'une idée
router.get('/', commentsController.getAllComments);

// POST /:ideaId/comments - Ajouter un commentaire à une idée (nécessite auth)
router.post('/', verifyAuthToken, commentsController.createComment);

// PUT /:ideaId/comments/:id - Modifier un commentaire (nécessite auth)
router.put('/:id', verifyAuthToken, commentsController.updateComment);

// DELETE /:ideaId/comments/:id - Supprimer un commentaire (nécessite auth)
router.delete('/:id', verifyAuthToken, commentsController.deleteComment);

export default router;
