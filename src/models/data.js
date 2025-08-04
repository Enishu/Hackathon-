// Structure temporaire des données (en attendant une vraie DB)
// Cette structure correspond à l'architecture du diagramme fourni

// Table des utilisateurs
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin', // 'admin' ou 'user'
    createdAt: new Date().toISOString()
  }
];

// Table des catégories
let categories = [
  { id: 1, name: 'Cognitif', icon: '🧠', description: 'Handicaps cognitifs et troubles de l\'apprentissage' },
  { id: 2, name: 'Visuel', icon: '👁️', description: 'Déficiences visuelles et cécité' },
  { id: 3, name: 'Auditif', icon: '👂', description: 'Surdité et troubles de l\'audition' },
  { id: 4, name: 'Moteur', icon: '🦽', description: 'Handicaps moteurs et mobilité réduite' },
  { id: 5, name: 'Éducation', icon: '📚', description: 'Accessibilité dans l\'éducation' },
  { id: 6, name: 'Mobilité', icon: '🚗', description: 'Transport et déplacements' },
  { id: 7, name: 'Santé', icon: '🏥', description: 'Accès aux soins et santé' },
  { id: 8, name: 'Urbanisme', icon: '🏙️', description: 'Aménagement urbain accessible' },
  { id: 9, name: 'Technologie', icon: '💻', description: 'Solutions technologiques d\'assistance' },
  { id: 10, name: 'Emploi', icon: '💼', description: 'Insertion professionnelle' },
  { id: 11, name: 'Autres', icon: '✨', description: 'Autres domaines' }
];

// Table des idées
let ideas = [
  {
    id: 1,
    title: 'Application de navigation vocale',
    description: 'Une app qui guide les personnes malvoyantes avec des instructions vocales détaillées',
    userId: 1,
    categoryId: 2,
    status: 'pending', // 'pending', 'approved', 'rejected'
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Table des likes (relation many-to-many entre users et ideas)
let likes = [
  {
    id: 1,
    userId: 1,
    ideaId: 1,
    createdAt: new Date().toISOString()
  }
];

// Table des commentaires
let comments = [
  {
    id: 1,
    content: 'Excellente idée ! Cela pourrait vraiment aider.',
    userId: 1,
    ideaId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Fonctions utilitaires pour générer des IDs
function getNextId(array) {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

module.exports = {
  // Data arrays
  users,
  categories,
  ideas,
  likes,
  comments,
  
  // Utility functions
  getNextId,
  
  // Helper functions for relationships
  getIdeasWithDetails: () => {
    return ideas.map(idea => ({
      ...idea,
      user: users.find(u => u.id === idea.userId),
      category: categories.find(c => c.id === idea.categoryId),
      likesCount: likes.filter(l => l.ideaId === idea.id).length,
      commentsCount: comments.filter(c => c.ideaId === idea.id).length,
      comments: comments.filter(c => c.ideaId === idea.id).map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.userId)
      }))
    }));
  },
  
  getIdeaById: (id) => {
    const idea = ideas.find(i => i.id === parseInt(id));
    if (!idea) return null;
    
    return {
      ...idea,
      user: users.find(u => u.id === idea.userId),
      category: categories.find(c => c.id === idea.categoryId),
      likesCount: likes.filter(l => l.ideaId === idea.id).length,
      commentsCount: comments.filter(c => c.ideaId === idea.id).length,
      comments: comments.filter(c => c.ideaId === idea.id).map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.userId)
      }))
    };
  }
};
