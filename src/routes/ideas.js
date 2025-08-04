const express = require('express');
const router = express.Router();
const { getAllIdeas, createIdea } = require('../controllers/ideasController');

// GET Récupérer toutes les idées
router.get('/', getAllIdeas);

// POST Créer une nouvelle idée
router.post('/', createIdea);

module.exports = router;
