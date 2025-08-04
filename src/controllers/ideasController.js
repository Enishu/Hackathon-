const { ideas } = require('../models/data');

// Fonction pour créer un ID unique
const createNewId = () => Date.now();

// Récupérer toutes les idées
const getAllIdeas = (req, res) => {
  res.json({
    success: true,
    data: ideas,
    total: ideas.length
  });
};

// Créer une nouvelle idée
const createIdea = (req, res) => {
  const { text, categoriesId, userId } = req.body;
  
  // Validation basique
  if (!text || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Text et userId requis'
    });
  }
  
  const newIdea = {
    id: createNewId(),
    text: text.trim(),
    creationDate: new Date().toISOString(),
    categoriesId: categoriesId || [],
    userId: userId
  };
  
  ideas.push(newIdea);
  
  res.status(201).json({
    success: true,
    data: newIdea
  });
};

module.exports = {
  getAllIdeas,
  createIdea
};
