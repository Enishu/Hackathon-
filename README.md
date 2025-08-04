# 🚀 Hackathon - Boîte à Idées Inclusives

## 📁 Structure du Projet

```
📂 Hackathon-/
├── 📂 back/           # 🖥️ Backend API (Node.js + Express)
│   ├── src/           # Code source backend
│   ├── index.js       # Point d'entrée
│   └── package.json   # Dépendances backend
├── 📂 client/         # 🎨 Frontend (React + Vite)
└── 📄 README.md       # 📖 Documentation principale
```

## 🚀 Démarrage Rapide

### 🖥️ Backend
```bash
cd back
npm install
npm run dev
# → http://localhost:3002
```

### 🎨 Frontend  
```bash
cd client
npm install
npm run dev
# → http://localhost:3000
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3002
- **API Test**: http://localhost:3002/api/test
- **API Health**: http://localhost:3002/api/health

## 📡 API Principales

### 🧠 Ideas
- `GET /api/ideas` - Liste des idées
- `POST /api/ideas` - Créer une idée
- `GET /api/ideas/:id` - Détails d'une idée

### 🏷️ Categories
- `GET /api/categories` - Liste des catégories

## 🛠️ Technologies

### Backend
- Node.js + Express (ES Modules)
- Joi (validation)
- Helmet (sécurité)
- Rate limiting
- CORS

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- ShadCN/UI

## 👥 Équipe
- Backend API prêt pour développement collaboratif
- Frontend configuré avec composants UI modernes
- Architecture modulaire et extensible

## 📚 Documentation
- **Backend**: voir `back/README.md`
- **Migration**: voir `back/MIGRATION_SUMMARY.md`