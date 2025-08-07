# Guide de Tests - API Boîte à Idées

## 📋 Ordre d'exécution des tests

### Étape 1: Authentification
1. **Register** - Créer un compte utilisateur
2. **Login** - Se connecter et récupérer le token JWT
3. **Copier le token** dans les variables pour les requêtes suivantes

### Étape 2: Tests des idées
1. **Créer des idées** - POST /api/ideas (avec token)
2. **Récupérer les idées** - GET /api/ideas
3. **Tester la pagination** - GET /api/ideas?limit=5&offset=0

### Étape 3: Tests des likes
1. **Voir le count initial** - GET /api/ideas/:id/likes
2. **Liker une idée** - POST /api/ideas/:id/likes (avec token)
3. **Vérifier l'augmentation** - GET /api/ideas/:id/likes
4. **Unliker** - DELETE /api/ideas/:id/likes (avec token)

### Étape 4: Tests des commentaires
1. **Voir les commentaires** - GET /api/ideas/:id/comments
2. **Ajouter un commentaire** - POST /api/ideas/:id/comments (avec token)
3. **Modifier le commentaire** - PUT /api/ideas/:id/comments/:commentId (avec token)
4. **Supprimer le commentaire** - DELETE /api/ideas/:id/comments/:commentId (avec token)

## 🎯 Résultats attendus

### ✅ Succès (codes 200/201)
- Register: `{ success: true, message: "Utilisateur créé", userId: X }`
- Login: `{ success: true, token: "eyJ...", user: {...} }`
- Créer idée: `{ success: true, data: { id: X, text: "...", userId: Y } }`
- Like: `{ success: true, data: { ideaId: X, likesCount: 1 } }`

### ❌ Erreurs attendues (codes 400/401/404)
- Sans token: `{ success: false, message: "Token manquant" }`
- Token invalide: `{ success: false, message: "Token invalide" }`
- Données manquantes: `{ success: false, message: "Le texte est requis" }`
- ID inexistant: `{ success: false, message: "Idée non trouvée" }`

## 🔧 Variables à mettre à jour

Après chaque étape, copie les valeurs retournées :

```
@token = eyJ... (depuis login)
@userId = 1 (depuis register)  
@ideaId = 1 (depuis création d'idée)
@commentId = 1 (depuis création de commentaire)
```

## 🚀 Test rapide

Pour un test rapide, utilise ces 3 requêtes dans l'ordre :

1. Register → copie userId
2. Login → copie token  
3. POST /api/ideas avec le token → copie ideaId
4. GET /api/ideas/:ideaId/likes → doit retourner 0
5. POST /api/ideas/:ideaId/likes avec token → doit retourner 1
