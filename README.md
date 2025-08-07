# API Boîte à Idées - Hackathon

API REST simple pour la gestion d'idées avec authentification JWT.

## Structure du projet

```
back/
├── src/
│   ├── config/          # Configuration (DB, env)
│   ├── controllers/     # Logique métier
│   ├── middlewares/     # Authentification, sécurité
│   ├── models/          # Modèles SQL
│   └── routes/          # Routes API
├── requests/            # Tests HTTP
└── index.js            # Point d'entrée
```

## Routes principales

- **Auth** : `/api/auth` (register, login, verify)
- **Idées** : `/api/ideas` (CRUD + sous-routes)
- **Catégories** : `/api/categories` (CRUD)

### Sous-routes des idées
- **Commentaires** : `/api/ideas/:id/comments`
- **Likes** : `/api/ideas/:id/likes`

## Documentation complète

- [Guide Postman](back/GUIDE_POSTMAN.md) - Tests API
- [Auth Postman](back/AUTH_POSTMAN_GUIDE.md) - Authentification
- [Routes Frontend](back/ROUTES_FRONTEND.md) - Intégration frontend

## Installation

```bash
cd back
npm install
npm start
```

Serveur sur http://localhost:3000