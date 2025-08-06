# API Backend - Routes avec TODO

Ce fichier explique la structure des routes créées avec des "trous" (TODO) pour les modèles.

## Structure des routes créées

### 🚀 Routes Ideas (`/api/ideas`)
- `GET /api/ideas` - Récupérer toutes les idées
- `GET /api/ideas/:id` - Récupérer une idée par ID
- `POST /api/ideas` - Créer une nouvelle idée
- `PUT /api/ideas/:id` - Modifier une idée
- `DELETE /api/ideas/:id` - Supprimer une idée

### 💬 Routes Comments (`/api/comments`)
- `GET /api/comments` - Récupérer tous les commentaires (optionnel: ?ideaId=X)
- `GET /api/comments/:id` - Récupérer un commentaire par ID
- `POST /api/comments` - Créer un nouveau commentaire
- `PUT /api/comments/:id` - Modifier un commentaire
- `DELETE /api/comments/:id` - Supprimer un commentaire

### ❤️ Routes Likes (`/api/likes`)
- `GET /api/likes` - Récupérer tous les likes (optionnel: ?ideaId=X ou ?userId=Y)
- `POST /api/likes` - Ajouter un like
- `DELETE /api/likes` - Supprimer un like (par userId et ideaId)
- `GET /api/likes/count/:ideaId` - Compter les likes d'une idée

### 📂 Routes Categories (`/api/categories`)
- `GET /api/categories` - Récupérer toutes les catégories
- `GET /api/categories/:id` - Récupérer une catégorie par ID
- `POST /api/categories` - Créer une nouvelle catégorie

## 🔧 TODO à compléter

Chaque route contient des commentaires `// TODO:` qui indiquent où implémenter :

1. **Appels aux modèles** : `await ModelName.methodName()`
2. **Validation des données** : Vérification des champs requis
3. **Vérifications d'existence** : Vérifier si l'élément existe avant modification/suppression
4. **Retour des vraies données** : Remplacer les `data: []` ou `data: {}` par les vraies données

## 📝 Exemple de TODO à compléter

```javascript
// TODO: Implémenter la récupération des idées depuis la base de données
// const ideas = await IdeaModel.getAllIdeas();

// TODO: remplacer par les vraies données
data: [] // Remplacer par : data: ideas
```

## 🗃️ Fichiers supprimés

- ❌ `data.js` - Structure temporaire supprimée
- ❌ `ideasController.js` - Controller supprimé (logique dans les routes)
- ❌ `categoriesController.js` - Controller supprimé (logique dans les routes)

## ✅ Fichiers créés/modifiés

- ✅ `routes/ideas.js` - Routes idées avec TODO
- ✅ `routes/comments.js` - Routes commentaires avec TODO
- ✅ `routes/likes.js` - Routes likes avec TODO
- ✅ `routes/categories.js` - Routes catégories avec TODO
- ✅ `index.js` - Ajout des nouvelles routes

Tous les TODO sont prêts à être complétés par la personne qui s'occupe des modèles !
