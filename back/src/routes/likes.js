// Routes pour les likes des idees
import express from 'express';
import * as likesController from '../controllers/likesController.js';
import auth from '../middlewares/verifyAuthToken.js';

const router = express.Router({ mergeParams: true });

// GET /:ideaId/likes - Récupérer le nombre de likes d'une idée
router.get('/', likesController.getAllLikes);

// POST /:ideaId/likes - Ajouter un like à une idée (nécessite auth)
router.post('/', auth, likesController.createLike);

// DELETE /:ideaId/likes - Supprimer un like d'une idée (nécessite auth)
router.delete('/', auth, likesController.deleteLike);

export default router;
