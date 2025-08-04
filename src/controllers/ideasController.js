const { 
  ideas, 
  getNextId, 
  getIdeasWithDetails, 
  getIdeaById: getIdeaFromData,
  users,
  categories 
} = require('../models/data');

// Récupérer toutes les idées avec leurs détails complets
const getAllIdeas = (req, res) => {
  try {
    const ideasWithDetails = getIdeasWithDetails();
    
    res.json({
      success: true,
      data: ideasWithDetails,
      total: ideasWithDetails.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des idées'
    });
  }
};

// Récupérer une idée par son ID
const getIdeaById = (req, res) => {
  try {
    const { id } = req.params;
    const idea = getIdeaFromData(parseInt(id));
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idée non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: idea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'idée'
    });
  }
};

// Créer une nouvelle idée
const createIdea = (req, res) => {
  try {
    const { title, description, categoryId, userId } = req.body;
    
    // Validation basique
    if (!title || !description || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Title, description et userId sont requis'
      });
    }
    
    // Vérifier que l'utilisateur existe (pour l'instant, utiliser userId=1 par défaut)
    const user = users.find(u => u.id === userId) || users[0];
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    // Vérifier que la catégorie existe
    if (categoryId && !categories.find(c => c.id === categoryId)) {
      return res.status(400).json({
        success: false,
        error: 'Catégorie non trouvée'
      });
    }
    
    const newIdea = {
      id: getNextId(ideas),
      title: title.trim(),
      description: description.trim(),
      userId: user.id,
      categoryId: categoryId || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    ideas.push(newIdea);
    
    // Retourner l'idée avec ses détails complets
    const ideaWithDetails = getIdeaFromData(newIdea.id);
    
    res.status(201).json({
      success: true,
      data: ideaWithDetails,
      message: 'Idée créée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de l\'idée'
    });
  }
};

// Mettre à jour une idée (pour plus tard, avec authentification)
const updateIdea = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, status } = req.body;
    
    const ideaIndex = ideas.findIndex(i => i.id === parseInt(id));
    if (ideaIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Idée non trouvée'
      });
    }
    
    // Mise à jour des champs fournis
    if (title) ideas[ideaIndex].title = title.trim();
    if (description) ideas[ideaIndex].description = description.trim();
    if (categoryId) ideas[ideaIndex].categoryId = categoryId;
    if (status) ideas[ideaIndex].status = status;
    ideas[ideaIndex].updatedAt = new Date().toISOString();
    
    const updatedIdea = getIdeaFromData(parseInt(id));
    
    res.json({
      success: true,
      data: updatedIdea,
      message: 'Idée mise à jour avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour de l\'idée'
    });
  }
};

// Supprimer une idée (pour plus tard, avec authentification)
const deleteIdea = (req, res) => {
  try {
    const { id } = req.params;
    const ideaIndex = ideas.findIndex(i => i.id === parseInt(id));
    
    if (ideaIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Idée non trouvée'
      });
    }
    
    ideas.splice(ideaIndex, 1);
    
    res.json({
      success: true,
      message: 'Idée supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de l\'idée'
    });
  }
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea
};
