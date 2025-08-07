# 📚 Guide Complet - API Boîte à Idées
*Explication détaillée pour débutants*

## 🎯 Vue d'ensemble de l'application

### Qu'est-ce que c'est ?
Une **API REST** (interface de programmation) qui permet de gérer une boîte à idées collaborative :
- Les utilisateurs peuvent s'inscrire et se connecter
- Créer, modifier, supprimer des idées
- Commenter les idées des autres
- "Liker" les idées qui leur plaisent
- Organiser les idées par catégories

### Technologies utilisées
- **Node.js** : Environnement JavaScript côté serveur
- **Express** : Framework web pour créer l'API
- **MySQL** : Base de données pour stocker les informations
- **JWT** : Système d'authentification sécurisé
- **bcrypt** : Chiffrement des mots de passe

---

## 🏗️ Architecture de l'application

```
back/
├── index.js                 # Point d'entrée du serveur
├── src/
│   ├── config/             # Configuration (base de données, environnement)
│   ├── controllers/        # Logique métier (ce que fait chaque route)
│   ├── middlewares/        # Fonctions intermédiaires (authentification, sécurité)
│   ├── models/            # Communication avec la base de données
│   ├── routes/            # Définition des URLs de l'API
│   └── utils/             # Fonctions utilitaires
└── requests/              # Fichiers de test de l'API
```

---

## 🚀 Point d'entrée : index.js

```javascript
// Importation des modules nécessaires
import env from "./src/config/env.js";           // Variables d'environnement
import express from "express";                   // Framework web
import { deleteUnverifiedUsers } from "./src/middlewares/scheduledTasks.js";
import applySecurityMiddlewares from "./src/middlewares/security.js";

// Importation des routes
import authRoutes from "./src/routes/authRoutes.js";      // Routes d'authentification
import ideasRoutes from './src/routes/ideas.js';          // Routes des idées
import categoriesRoutes from './src/routes/categories.js'; // Routes des catégories

// Création d'une instance Express (notre serveur web)
const app = express();

// Tâche automatique : supprime les comptes non vérifiés toutes les heures
deleteUnverifiedUsers.start();

// Configuration de la sécurité (CORS, headers, etc.)
applySecurityMiddlewares(app, env.SERVER_HOST, env.SERVER_PORT);

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Route de base pour tester que le serveur fonctionne
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de la boite à idées!");
});

// Définition des routes de l'API
app.use("/api/auth", authRoutes);        // Toutes les routes d'auth commencent par /api/auth
app.use('/api/ideas', ideasRoutes);      // Routes des idées + sous-routes comments/likes
app.use('/api/categories', categoriesRoutes); // Routes des catégories

// Démarrage du serveur sur le port configuré
app.listen(env.SERVER_PORT, () => {
    console.log(`Serveur lancé sur http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});
```

**Explication ligne par ligne :**
1. On importe tous les modules dont on a besoin
2. On crée une instance Express (notre serveur web)
3. On configure la sécurité et les middlewares
4. On définit nos routes d'API
5. On démarre le serveur qui écoute sur un port

---

## 🔐 Authentification : authController.js

### Inscription d'un utilisateur

```javascript
export async function register(req, res) {
    try {
        // 1. Récupération des données envoyées par l'utilisateur
        const { username, email, password, passwordConfirm } = req.body;

        // 2. Vérifications de base
        if (!username || !email || !password || !passwordConfirm)
            return res.status(400).json({ error: "Tous les champs sont requis." });

        if (password !== passwordConfirm)
            return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });

        // 3. Vérifier si l'utilisateur existe déjà
        const user = await User.findByEmail(email);
        if (user?.is_verified)
            return res.status(409).json({ error: "Cet email existe déjà." });

        // 4. Chiffrement du mot de passe (sécurité !)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Création d'un token pour vérifier l'email
        const token = jwt.sign({ email }, env.JWT_SECRET, {
            expiresIn: env.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
        });

        // 6. Sauvegarde en base de données
        await User.create({
            username,
            email,
            hashedPassword,
            emailTokenExpiresAt: new Date(jwt.decode(token).exp * 1000),
        });

        // 7. Envoi d'un email de confirmation
        sendEmail({
            to: email,
            subject: "Veuillez confirmer votre adresse email",
            html: `<p><a href="http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/auth/verify-email/${token}">Vérifier l'adresse email</a></p>`
        });

        // 8. Réponse de succès
        res.status(201).json({
            message: "Utilisateur créé. Un email de vérification a été envoyé.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Le serveur a rencontré une erreur." });
    }
}
```

**Processus d'inscription :**
1. L'utilisateur envoie ses informations
2. On vérifie que tout est correct
3. On chiffre le mot de passe pour la sécurité
4. On crée un compte "non vérifié"
5. On envoie un email de confirmation
6. L'utilisateur doit cliquer sur le lien pour activer son compte

### Connexion d'un utilisateur

```javascript
export async function login(req, res) {
    try {
        // 1. Récupération des identifiants
        const { email, password } = req.body;

        // 2. Vérifications
        if (!email || !password)
            return res.status(400).json({ error: "Tous les champs sont requis." });

        // 3. Recherche de l'utilisateur en base
        const user = await User.findByEmail(email);

        // 4. Vérification du mot de passe ET que le compte est vérifié
        if (!user?.is_verified || !(await bcrypt.compare(password, user.hashed_password))) {
            return res.status(401).json({
                error: "Email ou mot de passe incorrect",
            });
        }

        // 5. Génération d'un token JWT (comme une carte d'identité numérique)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
        );

        // 6. Mise à jour de la dernière connexion
        await User.recordLastLogin(email);

        // 7. Réponse avec le token et les infos utilisateur
        res.status(200).json({
            message: "Connexion réussie.",
            token: token,
            username: user.username,
            user: {
                username: user.username,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Le serveur a rencontré une erreur." });
    }
}
```

**Processus de connexion :**
1. L'utilisateur envoie email + mot de passe
2. On vérifie que le compte existe et est activé
3. On compare le mot de passe (version chiffrée)
4. Si tout est bon, on génère un **JWT token**
5. Ce token servira pour toutes les actions protégées

---

## 💡 Gestion des idées : ideasController.js

### Récupérer toutes les idées (avec pagination)

```javascript
export const getAllIdeas = async (req, res) => {
  try {
    // 1. Récupération des paramètres optionnels de l'URL
    const { order, limit, offset } = req.query;
    
    // 2. Validation et préparation des options
    const data = {};
    if (order && ['ASC', 'DESC'].includes(order.toUpperCase())) {
      data.order = order.toUpperCase();  // Tri croissant ou décroissant
    }
    if (limit && parseInt(limit) > 0) {
      data.limit = parseInt(limit);      // Nombre maximum d'idées à retourner
    }
    if (offset && parseInt(offset) >= 0) {
      data.offset = parseInt(offset);    // Nombre d'idées à ignorer (pagination)
    }
    
    // 3. Appel au modèle pour récupérer les données
    const ideas = await IdeaModel.getAll(data);
    
    // 4. Réponse de succès
    res.status(200).json({
      success: true,
      message: 'Idées récupérées avec succès',
      data: ideas
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des idées:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des idées'
    });
  }
};
```

**Exemple d'utilisation :**
- `GET /api/ideas` → Toutes les idées
- `GET /api/ideas?limit=10` → Les 10 premières idées
- `GET /api/ideas?limit=10&offset=20` → Idées 21 à 30 (pagination)
- `GET /api/ideas?order=DESC` → Idées les plus récentes d'abord

### Créer une nouvelle idée

```javascript
export const createIdeas = async (req, res) => {
  try {
    // 1. Récupération des données
    const { text } = req.body;           // Le contenu de l'idée
    const userId = req.user.id;          // ID de l'utilisateur (depuis le token JWT)
    
    // 2. Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }
    
    // 3. Sauvegarde en base de données
    const result = await IdeaModel.create({ text, userId });
    
    // 4. Réponse avec les données créées
    res.status(201).json({
      success: true,
      message: 'Idée créée avec succès',
      data: { id: result.insertId, text, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'idée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'idée'
    });
  }
};
```

**Point important :** `req.user.id` vient du middleware d'authentification qui décode le JWT token.

---

## 🔒 Middleware d'authentification

```javascript
// verifyAuthToken.js
export const verifyAuthToken = (req, res, next) => {
  try {
    // 1. Récupération du token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    
    // 2. Vérification de la présence du token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification manquant'
      });
    }
    
    // 3. Vérification et décodage du token
    const decoded = jwt.verify(token, env.JWT_SECRET);
    
    // 4. Ajout des informations utilisateur à la requête
    req.user = decoded;  // Maintenant req.user contient {id, email, role}
    
    // 5. Passage au middleware suivant (ou au controller)
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
};
```

**Comment ça marche :**
1. L'utilisateur envoie son token dans l'en-tête `Authorization: Bearer TOKEN`
2. Le middleware vérifie que le token est valide
3. Si oui, il décode les informations et les ajoute à `req.user`
4. Le controller peut ensuite utiliser `req.user.id` pour savoir qui fait la requête

---

## 🗨️ Système de commentaires : commentsController.js

### Architecture des sous-routes

```javascript
// Dans ideas.js
router.use('/:ideaId/comments', commentsRoutes);
```

Cela signifie que toutes les routes de commentaires sont des **sous-routes** des idées :
- `GET /api/ideas/5/comments` → Commentaires de l'idée #5
- `POST /api/ideas/5/comments` → Ajouter un commentaire à l'idée #5

### Récupérer les commentaires d'une idée

```javascript
export const getAllComments = async (req, res) => {
  try {
    // 1. L'ID de l'idée vient de l'URL : /api/ideas/:ideaId/comments
    const { ideaId } = req.params;
    
    // 2. Récupération depuis la base de données
    const comments = await CommentModel.findByIdeaId(ideaId);
    
    // 3. Réponse avec les commentaires
    res.status(200).json({
      success: true,
      message: 'Commentaires de l\'idée récupérés avec succès',
      data: comments
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des commentaires'
    });
  }
};
```

### Créer un commentaire

```javascript
export const createComment = async (req, res) => {
  try {
    // 1. Récupération des données
    const { ideaId } = req.params;      // ID de l'idée depuis l'URL
    const { text } = req.body;          // Contenu du commentaire
    const userId = req.user.id;         // ID de l'utilisateur (depuis le token)
    
    // 2. Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte du commentaire est requis'
      });
    }
    
    // 3. Sauvegarde
    const result = await CommentModel.create({ text, ideaId, userId });
    
    // 4. Réponse de succès
    res.status(201).json({
      success: true,
      message: 'Commentaire créé avec succès',
      data: { id: result.insertId, text, ideaId, userId }
    });
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du commentaire'
    });
  }
};
```

---

## 👍 Système de likes : likesController.js

### Compter les likes d'une idée

```javascript
export const getAllLikes = async (req, res) => {
  try {
    // 1. ID de l'idée depuis l'URL
    const { ideaId } = req.params;
    
    // 2. Utilisation de la méthode d'Hervé pour compter
    const count = await LikeModel.countByIdeaId(ideaId);
    
    // 3. Réponse avec le nombre de likes
    res.status(200).json({
      success: true,
      message: 'Nombre de likes récupéré avec succès',
      data: {
        ideaId: parseInt(ideaId),
        likesCount: count
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des likes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des likes'
    });
  }
};
```

### Liker une idée

```javascript
export const createLike = async (req, res) => {
  try {
    // 1. Récupération des données
    const { ideaId } = req.params;
    const userId = req.user.id;
    
    // 2. Tentative d'ajout du like
    try {
      await LikeModel.link({ ideaId, userId });
      
      res.status(201).json({
        success: true,
        message: 'Like ajouté avec succès',
        data: { ideaId, userId }
      });
    } catch (error) {
      // 3. Gestion du cas où l'utilisateur a déjà liké
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Vous avez déjà aimé cette idée'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du like:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'ajout du like'
    });
  }
};
```

**Explication technique :** Le système utilise une contrainte unique en base de données (ideaId + userId) pour empêcher qu'un utilisateur like plusieurs fois la même idée.

---

## 🛣️ Système de routes modulaire

### Route principale : ideas.js

```javascript
import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import * as ideasController from '../controllers/ideasController.js';

// Import des sous-routes
import commentsRoutes from './comments.js';
import likesRoutes from './likes.js';

const router = express.Router();

// Routes principales des idées
router.get('/', ideasController.getAllIdeas);                    // PUBLIC
router.get('/:id', ideasController.getIdeaById);                // PUBLIC  
router.post('/', auth, ideasController.createIdeas);            // PROTÉGÉ
router.put('/:id', auth, ideasController.updateIdea);           // PROTÉGÉ
router.delete('/:id', auth, ideasController.deleteIdea);        // PROTÉGÉ

// Sous-routes modulaires (suggestion d'Hervé)
router.use('/:ideaId/comments', commentsRoutes);  // Délègue à comments.js
router.use('/:ideaId/likes', likesRoutes);        // Délègue à likes.js

export default router;
```

### Sous-route : comments.js

```javascript
import express from 'express';
import auth from '../middlewares/verifyAuthToken.js';
import * as commentsController from '../controllers/commentsController.js';

// mergeParams: true permet d'accéder aux paramètres du parent (:ideaId)
const router = express.Router({ mergeParams: true });

router.get('/', commentsController.getAllComments);           // PUBLIC
router.post('/', auth, commentsController.createComment);     // PROTÉGÉ
router.put('/:id', auth, commentsController.updateComment);   // PROTÉGÉ
router.delete('/:id', auth, commentsController.deleteComment); // PROTÉGÉ

export default router;
```

**Avantages de cette architecture :**
- **Modulaire** : Chaque ressource a son propre fichier
- **Réutilisable** : Les sous-routes peuvent être utilisées ailleurs
- **Lisible** : URL claires et logiques (`/ideas/5/comments`)
- **Maintenable** : Facile de modifier une partie sans casser le reste

---

## 💾 Modèles de données (exemples)

### Modèle Ideas.js

```javascript
import pool from "../config/database.js";

// Récupérer toutes les idées avec options
export async function getAll(options = {}) {
    let query = "SELECT * FROM ideas";
    const params = [];
    
    // Construction dynamique de la requête SQL
    if (options.order) {
        query += ` ORDER BY created_at ${options.order}`;
    }
    if (options.limit) {
        query += " LIMIT ?";
        params.push(options.limit);
    }
    if (options.offset) {
        query += " OFFSET ?";
        params.push(options.offset);
    }
    
    const [rows] = await pool.query(query, params);
    return rows;
}

// Créer une nouvelle idée
export async function create(data) {
    const { text, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
        [text, userId]
    );
    return result;
}

// Trouver une idée par ID
export async function findById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM ideas WHERE id = ?",
        [id]
    );
    return rows[0];
}
```

**Explication :**
- Chaque fonction correspond à une opération en base de données
- On utilise des **requêtes préparées** (?) pour éviter les injections SQL
- Le pool de connexions optimise les performances

---

## 🧪 Tests de l'API

### Exemple de test avec un fichier .http

```http
### 1. Inscription
POST http://localhost:3002/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "motdepasse123",
  "passwordConfirm": "motdepasse123"
}

### 2. Connexion (récupérer le token)
POST http://localhost:3002/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "motdepasse123"
}

### 3. Créer une idée (avec le token)
POST http://localhost:3002/api/ideas
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "text": "Une application pour organiser des hackathons"
}

### 4. Liker l'idée
POST http://localhost:3002/api/ideas/1/likes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### 5. Commenter l'idée
POST http://localhost:3002/api/ideas/1/comments
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "text": "Excellente idée ! J'aimerais participer."
}
```

---

## 🔐 Sécurité de l'application

### 1. Chiffrement des mots de passe
```javascript
// Lors de l'inscription
const hashedPassword = await bcrypt.hash(password, 10);

// Lors de la connexion
const isValid = await bcrypt.compare(password, user.hashed_password);
```

### 2. Tokens JWT
- **Stateless** : Le serveur ne stocke pas les sessions
- **Sécurisé** : Signé avec une clé secrète
- **Expirable** : Durée de vie limitée

### 3. Validation des données
```javascript
if (!text) {
    return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
    });
}
```

### 4. Requêtes préparées SQL
```javascript
// ✅ Bon (sécurisé)
const [rows] = await pool.query("SELECT * FROM ideas WHERE id = ?", [id]);

// ❌ Mauvais (vulnérable aux injections SQL)
const [rows] = await pool.query(`SELECT * FROM ideas WHERE id = ${id}`);
```

---

## 🎯 Points clés pour la présentation

### 1. **Architecture RESTful**
- Une URL = une ressource
- Méthodes HTTP claires (GET, POST, PUT, DELETE)
- Réponses JSON standardisées

### 2. **Sécurité**
- Mots de passe chiffrés
- Authentification par tokens JWT
- Validation des données d'entrée

### 3. **Modularité**
- Code organisé par fonctionnalité
- Séparation des responsabilités (routes, controllers, models)
- Réutilisabilité des composants

### 4. **Expérience développeur**
- Code commenté et documenté
- Tests prêts à utiliser
- Structure claire et logique

### 5. **Performance**
- Pool de connexions base de données
- Pagination des résultats
- Gestion des erreurs

---

## 🚀 Démonstration en live

Pour une démo, tu peux :

1. **Démarrer le serveur** : `npm start`
2. **Ouvrir les tests** dans VS Code
3. **Montrer le cycle complet** :
   - Inscription → Email de confirmation
   - Connexion → Récupération du token
   - Création d'idée → Sauvegarde en base
   - Like + Commentaire → Interaction
   - Récupération des données → Affichage

4. **Expliquer le code** en temps réel pendant les tests

Cette application démontre tous les concepts fondamentaux du développement web backend moderne ! 🎉
