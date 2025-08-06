import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllCategories,
  getCategoryById,
  createCategory
} from '../controllers/categoriesController.js';

const router = express.Router();

// GET /api/categories - Récupérer toutes les catégories (PUBLIC)
router.get('/', getAllCategories);

// GET /api/categories/:id - Récupérer une catégorie par ID (PUBLIC)
router.get('/:id', getCategoryById);

// POST /api/categories - Créer une nouvelle catégorie (PROTÉGÉ - ADMIN)
router.post('/', auth, createCategory);

export default router;