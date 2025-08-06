import express from 'express';
import ;

const router = express.Router();

// GET /api/categories - Récupérer toutes les catégories
router.get('/', getAllCategories);

export default router;