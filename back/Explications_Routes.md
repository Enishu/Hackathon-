## Structure des routes avec sous-ressources


## Routes Ideas (principales)
- `GET /api/ideas` - Toutes les idées (PUBLIC)
- `GET /api/ideas/:id` - Une idée spécifique (PUBLIC)  
- `POST /api/ideas` - Créer une idée (PROTEGE JWT)
- `PUT /api/ideas/:id` - Modifier une idée (PROTEGE JWT)
- `DELETE /api/ideas/:id` - Supprimer une idée (PROTEGE JWT)
- `GET /api/ideas/user/:userId` - Idées d'un utilisateur (PUBLIC)

### Sous-routes Comments
- `GET /api/ideas/:ideaId/comments` - Tous les commentaires d'une idée (PUBLIC)
- `POST /api/ideas/:ideaId/comments` - Commenter une idée (PROTEGE JWT)
- `PUT /api/ideas/:ideaId/comments/:commentId` - Modifier un commentaire (PROTEGE JWT)
- `DELETE /api/ideas/:ideaId/comments/:commentId` - Supprimer un commentaire (PROTEGE JWT)

### Sous-routes Likes  
- `GET /api/ideas/:ideaId/likes` - Info sur les likes d'une idée (PUBLIC)
- `POST /api/ideas/:ideaId/likes` - Liker une idée (PROTEGE JWT)
- `DELETE /api/ideas/:ideaId/likes` - Unliker une idée (PROTEGE JWT)
- `GET /api/ideas/:ideaId/likes/count` - Compter les likes (PUBLIC)

### Routes Categories 
- `GET /api/categories` - Toutes les catégories (PUBLIC)
- `GET /api/categories/:id` - Une catégorie spécifique (PUBLIC)
- `POST /api/categories` - Créer une catégorie (PROTEGE JWT)