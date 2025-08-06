# 🚀 Backend API - Hackathon

## 📁 Structure
```
back/
├── index.js              # Point d'entrée (ES modules)
├── package.json          # Dépendances et scripts
├── .env                  # Variables d'environnement
├── .env.example          # Exemple de configuration
├── MIGRATION_SUMMARY.md  # Documentation de migration
└── src/
    ├── config/           # Configuration (env, database)
    ├── controllers/      # Logique métier
    ├── middlewares/      # Middlewares personnalisés
    ├── models/           # Modèles de données
    ├── routes/           # Routes API
    └── utils/            # Utilitaires
```

## 🚀 Démarrage Rapide

```bash
# Aller dans le dossier backend
cd back

# Installer les dépendances
npm install

# Copier et configurer l'environnement
cp .env
# Éditer .env avec vos valeurs

# Démarrer en développement
npm run dev

# Ou démarrer en production
npm start
```

## 📡 API Endpoints

### 🧠 Ideas
- `GET /api/ideas` - Liste des idées (avec pagination)
- `GET /api/ideas/:id` - Détails d'une idée
- `POST /api/ideas` - Créer une idée
- `PUT /api/ideas/:id` - Modifier une idée
- `DELETE /api/ideas/:id` - Supprimer une idée

### 🏷️ Categories  
- `GET /api/categories` - Liste des catégories

### 🔧 System
- `GET /api/test` - Test de l'API
- `GET /api/health` - État de santé du serveur

## 🛡️ Sécurité
- ✅ Rate limiting (100 req/15min)
- ✅ Headers sécurisés (Helmet)
- ✅ Validation des données (Joi)
- ✅ CORS configuré
- ✅ Nettoyage des inputs

## 🔧 Scripts NPM
- `npm start` - Démarrer en production
- `npm run dev` - Démarrer avec nodemon
- `npm test` - Tests (à implémenter)

## 🌐 URL par Défaut
- Backend: http://localhost:3001
- Test: http://localhost:3001/api/test

## 📦 Technologies
- Node.js + Express (ES Modules)
- Joi (validation)
- Helmet (sécurité)
- Express-rate-limit
- CORS
- Dotenv + Envalid
