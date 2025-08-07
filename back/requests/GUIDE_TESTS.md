# Guide de Tests API - Procédure Complète

## 📋 Procédure de Test Complète

### Étape 1: Démarrage
1. **Démarrer le serveur** : `cd back && npm start`
2. **Vérifier** : http://localhost:3000 → "Bienvenue sur l'API de la boite à idées!"

### Étape 2: Créer un utilisateur de test
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "email": "test@hackathon.com",
    "password": "test123456",
    "confirmPassword": "test123456"
}
```

### Étape 3: Se connecter et récupérer le token
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "test@hackathon.com",
    "password": "test123456"
}
```
**📝 IMPORTANT** : Copier le `token` dans la réponse pour les étapes suivantes.

### Étape 4: Créer des idées
```http
POST http://localhost:3000/api/ideas
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_ICI

{
    "text": "Première idée géniale !"
}
```

### Étape 5: Tester les likes
```http
# 5.1 Voir le nombre de likes (devrait être 0)
GET http://localhost:3000/api/ideas/1/likes

# 5.2 Liker l'idée
POST http://localhost:3000/api/ideas/1/likes
Authorization: Bearer YOUR_TOKEN_ICI

# 5.3 Vérifier le nombre de likes (devrait être 1)
GET http://localhost:3000/api/ideas/1/likes

# 5.4 Unliker l'idée  
DELETE http://localhost:3000/api/ideas/1/likes
Authorization: Bearer YOUR_TOKEN_ICI
```

### Étape 6: Tester les commentaires
```http
# 6.1 Ajouter un commentaire
POST http://localhost:3000/api/ideas/1/comments
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_ICI

{
    "text": "Super commentaire sur cette idée !"
}

# 6.2 Voir tous les commentaires
GET http://localhost:3000/api/ideas/1/comments

# 6.3 Modifier le commentaire (ID du commentaire dans l'URL)
PUT http://localhost:3000/api/ideas/1/comments/1
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_ICI

{
    "text": "Commentaire modifié !"
}
```

### Étape 7: Tester les catégories
```http
# 7.1 Créer une catégorie
POST http://localhost:3000/api/categories
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_ICI

{
    "name": "Innovation",
    "description": "Idées innovantes"
}

# 7.2 Voir toutes les catégories
GET http://localhost:3000/api/categories
```

## ✅ Tests de Validation

### Cas d'erreur à tester :
- ❌ Créer idée sans token → 401 Unauthorized
- ❌ Créer idée avec texte vide → 400 Bad Request  
- ❌ Liker deux fois la même idée → 409 Conflict
- ❌ Token invalide → 401 Unauthorized

### Cas de succès attendus :
- ✅ Création compte → 201 + message succès
- ✅ Login → 200 + token
- ✅ Création idée → 201 + ID idée
- ✅ Like/Unlike → 201/200 + compteur
- ✅ Commentaire CRUD → 201/200/204

## 🚀 Scénario Complet de Démonstration

1. **Créer 2 utilisateurs** (Alice et Bob)
2. **Alice crée 3 idées**
3. **Bob like les idées d'Alice** 
4. **Alice commente ses propres idées**
5. **Bob commente les idées d'Alice**
6. **Vérifier les compteurs de likes**
7. **Tester pagination** avec `?limit=2&offset=0`

## 📊 Résultats Attendus

- **Base de données** : Users, Ideas, Likes, Comments peuplés
- **API** : Toutes routes fonctionnelles
- **Sécurité** : JWT vérifié sur routes protégées  
- **Validation** : Erreurs gérées proprement
