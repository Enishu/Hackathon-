import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import { 
  getAllCategories,
  getCategoryById,
  createCategory
} from '../controllers/categoriesController.js';

const router = express.Router();

// GET /api/categories - Recuperer toutes les categories (PUBLIC)
router.get('/', getAllCategories);

// GET /api/categories/:id - Recuperer une categorie par ID (PUBLIC)
router.get('/:id', getCategoryById);

// POST /api/categories - Creer une nouvelle categorie (PROTEGE - ADMIN)
router.post('/', auth, createCategory);

export default router;