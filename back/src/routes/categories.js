import express from 'express';
import { getAllCategories } from '../controllers/categoriesController.js';

const router = express.Router();

// GET /api/categories - Récupérer toutes les catégories
router.get('/', getAllCategories);

export default router;