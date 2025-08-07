# 🎓 Guide Technique - Concepts Avancés
*Explication des patterns et bonnes pratiques utilisés*

## 🏗️ Architecture MVC (Model-View-Controller)

Notre application suit le pattern MVC adapté pour une API :

```
Requête HTTP → Routes → Controller → Model → Base de données
                ↑         ↑          ↑
            Définit    Logique    Accès aux
            les URLs   métier     données
```

### Exemple concret : Création d'une idée

1. **Route** (`ideas.js`) :
```javascript
router.post('/', auth, ideasController.createIdeas);
//          ↑     ↑              ↑
//        URL  Middleware    Controller
```

2. **Middleware** (`verifyAuthToken.js`) :
```javascript
const decoded = jwt.verify(token, env.JWT_SECRET);
req.user = decoded;  // Ajoute l'utilisateur à la requête
next();              // Passe au controller
```

3. **Controller** (`ideasController.js`) :
```javascript
const { text } = req.body;          // Données de la requête
const userId = req.user.id;         // Données du middleware
const result = await IdeaModel.create({ text, userId }); // Appel au modèle
res.status(201).json({ success: true, data: result });   // Réponse
```

4. **Model** (`Ideas.js`) :
```javascript
const [result] = await pool.query(
    "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
    [text, userId]
);
return result;
```

---

## 🔐 Authentification JWT - Fonctionnement détaillé

### 1. Structure d'un JWT Token

Un JWT est composé de 3 parties séparées par des points :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.signature
│                                       │                                              │
│                                       │                                              └── Signature
│                                       └── Payload (données utilisateur encodées)
└── Header (algorithme de chiffrement)
```

### 2. Génération du token (login)

```javascript
// Lors de la connexion
const token = jwt.sign(
    { 
        id: user.id,           // ID utilisateur
        email: user.email,     // Email utilisateur  
        role: user.role        // Rôle (user, admin, etc.)
    },
    env.JWT_SECRET,            // Clé secrète du serveur
    { expiresIn: '24h' }       // Durée de validité
);
```

### 3. Vérification du token (middleware)

```javascript
// À chaque requête protégée
const decoded = jwt.verify(token, env.JWT_SECRET);
// Si le token est valide, decoded contient : {id: 1, email: "...", role: "user"}
req.user = decoded;
```

### 4. Utilisation dans les controllers

```javascript
// Le controller peut maintenant utiliser les infos utilisateur
const userId = req.user.id;    // ID de l'utilisateur connecté
const userRole = req.user.role; // Rôle pour les permissions
```

**Avantages du JWT :**
- **Stateless** : Pas besoin de stocker les sessions côté serveur
- **Sécurisé** : Impossible à falsifier sans la clé secrète
- **Décentralisé** : Peut être vérifié par n'importe quel service
- **Performant** : Pas de requête base de données pour vérifier

---

## 🗃️ Gestion de la base de données

### 1. Pool de connexions

```javascript
// config/database.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 10,        // Max 10 connexions simultanées
    acquireTimeout: 60000,      // Timeout de 60s
    timeout: 60000,
    reconnect: true
});
```

**Pourquoi un pool ?**
- **Performance** : Réutilise les connexions existantes
- **Évite la surcharge** : Limite le nombre de connexions
- **Auto-reconnexion** : Gère les coupures réseau

### 2. Requêtes préparées (sécurité)

```javascript
// ✅ SÉCURISÉ - Requête préparée
const [rows] = await pool.query(
    "SELECT * FROM ideas WHERE user_id = ? AND status = ?",
    [userId, 'active']
);

// ❌ VULNÉRABLE - Injection SQL possible
const [rows] = await pool.query(
    `SELECT * FROM ideas WHERE user_id = ${userId} AND status = '${status}'`
);
```

**Protection contre l'injection SQL :**
```sql
-- Si un utilisateur malveillant envoie : '; DROP TABLE ideas; --
-- Avec une requête préparée, ça devient :
SELECT * FROM ideas WHERE user_id = '\'; DROP TABLE ideas; --' AND status = 'active'
-- Le code malveillant est traité comme une chaîne, pas comme du SQL
```

### 3. Gestion des transactions

```javascript
// Pour des opérations complexes nécessitant plusieurs requêtes
export async function createIdeaWithCategory(ideaData, categoryId) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // 1. Créer l'idée
        const [ideaResult] = await connection.query(
            "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
            [ideaData.text, ideaData.userId]
        );
        
        // 2. Lier à la catégorie
        await connection.query(
            "INSERT INTO idea_categories (idea_id, category_id) VALUES (?, ?)",
            [ideaResult.insertId, categoryId]
        );
        
        // 3. Si tout s'est bien passé, valider
        await connection.commit();
        return ideaResult;
        
    } catch (error) {
        // 4. En cas d'erreur, annuler tout
        await connection.rollback();
        throw error;
    } finally {
        // 5. Libérer la connexion
        connection.release();
    }
}
```

---

## 🛣️ Architecture des routes avancée

### 1. Middleware en cascade

```javascript
// Plusieurs middlewares peuvent s'enchaîner
router.post('/', 
    rateLimiter,           // 1. Limite le nombre de requêtes
    validateInput,         // 2. Valide les données
    auth,                  // 3. Vérifie l'authentification
    checkPermissions,      // 4. Vérifie les permissions
    ideasController.create // 5. Exécute la logique métier
);
```

### 2. Sous-routes avec paramètres partagés

```javascript
// Route parent
router.use('/:ideaId/comments', commentsRoutes);

// Dans commentsRoutes (avec mergeParams: true)
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    // req.params.ideaId est disponible ici grâce à mergeParams
    const { ideaId } = req.params;
});
```

### 3. Middleware de validation personnalisé

```javascript
// middlewares/validation.js
export const validateIdea = (req, res, next) => {
    const { text } = req.body;
    
    // Validation basique
    if (!text || text.length < 10) {
        return res.status(400).json({
            success: false,
            message: 'Le texte doit contenir au moins 10 caractères'
        });
    }
    
    // Nettoyage des données
    req.body.text = text.trim();
    
    next();
};

// Utilisation
router.post('/', auth, validateIdea, ideasController.create);
```

---

## 🔄 Gestion des erreurs robuste

### 1. Middleware global de gestion d'erreurs

```javascript
// middlewares/errorHandler.js
export const globalErrorHandler = (err, req, res, next) => {
    console.error('Erreur globale:', err);
    
    // Erreur de validation JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token invalide'
        });
    }
    
    // Erreur de base de données
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: 'Cette ressource existe déjà'
        });
    }
    
    // Erreur générique
    res.status(500).json({
        success: false,
        message: 'Erreur serveur interne'
    });
};

// Dans index.js (à la fin, après toutes les routes)
app.use(globalErrorHandler);
```

### 2. Wrapper pour les fonctions async

```javascript
// utils/asyncHandler.js
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Utilisation dans les controllers
export const createIdea = asyncHandler(async (req, res) => {
    // Plus besoin de try/catch, les erreurs sont automatiquement gérées
    const { text } = req.body;
    const userId = req.user.id;
    
    const result = await IdeaModel.create({ text, userId });
    
    res.status(201).json({
        success: true,
        data: result
    });
});
```

---

## 📊 Pagination et filtrage avancés

### 1. Système de pagination complet

```javascript
export const getAllIdeas = async (req, res) => {
    // Paramètres avec valeurs par défaut
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const order = req.query.order || 'DESC';
    const search = req.query.search;
    
    // Construction de la requête SQL dynamique
    let query = "SELECT * FROM ideas WHERE 1=1";
    const params = [];
    
    // Recherche textuelle
    if (search) {
        query += " AND text LIKE ?";
        params.push(`%${search}%`);
    }
    
    // Tri et pagination
    query += ` ORDER BY created_at ${order} LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    
    // Exécution
    const [ideas] = await pool.query(query, params);
    
    // Comptage total pour la pagination
    const [countResult] = await pool.query(
        "SELECT COUNT(*) as total FROM ideas" + (search ? " WHERE text LIKE ?" : ""),
        search ? [`%${search}%`] : []
    );
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
        success: true,
        data: ideas,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    });
};
```

### 2. Filtrage par relations

```javascript
// Récupérer les idées avec le nombre de likes et commentaires
export const getIdeasWithStats = async (req, res) => {
    const query = `
        SELECT 
            i.id,
            i.text,
            i.created_at,
            u.username,
            COUNT(DISTINCT l.id) as likes_count,
            COUNT(DISTINCT c.id) as comments_count
        FROM ideas i
        LEFT JOIN users u ON i.user_id = u.id
        LEFT JOIN likes l ON i.id = l.idea_id
        LEFT JOIN comments c ON i.id = c.idea_id
        GROUP BY i.id, i.text, i.created_at, u.username
        ORDER BY i.created_at DESC
    `;
    
    const [ideas] = await pool.query(query);
    
    res.json({
        success: true,
        data: ideas
    });
};
```

---

## 🧪 Tests automatisés

### 1. Tests d'intégration avec Jest

```javascript
// tests/ideas.test.js
import request from 'supertest';
import app from '../index.js';

describe('Ideas API', () => {
    let authToken;
    let ideaId;
    
    beforeAll(async () => {
        // Connexion pour récupérer un token
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
            
        authToken = loginResponse.body.token;
    });
    
    test('Créer une idée', async () => {
        const response = await request(app)
            .post('/api/ideas')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                text: 'Test idée pour les tests automatisés'
            });
            
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.text).toBe('Test idée pour les tests automatisés');
        
        ideaId = response.body.data.id;
    });
    
    test('Récupérer toutes les idées', async () => {
        const response = await request(app).get('/api/ideas');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
    
    test('Liker une idée', async () => {
        const response = await request(app)
            .post(`/api/ideas/${ideaId}/likes`)
            .set('Authorization', `Bearer ${authToken}`);
            
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });
});
```

### 2. Tests de charge avec Artillery

```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3002'
  phases:
    - duration: 60
      arrivalRate: 10
  defaults:
    headers:
      Authorization: 'Bearer eyJ...'

scenarios:
  - name: "Récupérer les idées"
    requests:
      - get:
          url: "/api/ideas"
      - get:
          url: "/api/ideas?limit=20&page=1"
```

```bash
# Lancer les tests de charge
artillery run artillery-config.yml
```

---

## 🔒 Sécurité avancée

### 1. Rate limiting (limitation du débit)

```javascript
// middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,                    // Max 5 tentatives de connexion
    message: {
        success: false,
        message: 'Trop de tentatives de connexion, réessayez dans 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false
});

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                  // Max 100 requêtes par IP
    message: {
        success: false,
        message: 'Trop de requêtes, réessayez plus tard'
    }
});

// Utilisation
app.use('/api/auth/login', authLimiter);
app.use('/api/', apiLimiter);
```

### 2. Validation avec Joi

```javascript
// middlewares/validation.js
import Joi from 'joi';

const ideaSchema = Joi.object({
    text: Joi.string().min(10).max(500).required()
});

export const validateIdea = (req, res, next) => {
    const { error } = ideaSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    
    next();
};
```

### 3. Sanitisation des données

```javascript
// middlewares/sanitize.js
import createDOMPurify from 'isomorphic-dompurify';
const DOMPurify = createDOMPurify();

export const sanitizeInput = (req, res, next) => {
    // Nettoie le HTML malveillant dans le texte
    if (req.body.text) {
        req.body.text = DOMPurify.sanitize(req.body.text);
    }
    
    next();
};
```

---

## 📈 Monitoring et logging

### 1. Logging structuré avec Winston

```javascript
// utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'ideas-api' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

export default logger;

// Utilisation dans les controllers
import logger from '../utils/logger.js';

export const createIdea = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;
        
        logger.info('Création d\'une idée', { userId, textLength: text.length });
        
        const result = await IdeaModel.create({ text, userId });
        
        logger.info('Idée créée avec succès', { ideaId: result.insertId, userId });
        
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        logger.error('Erreur lors de la création d\'idée', { 
            error: error.message, 
            stack: error.stack,
            userId: req.user?.id 
        });
        
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        });
    }
};
```

### 2. Métriques avec Prometheus

```javascript
// middlewares/metrics.js
import prometheus from 'prom-client';

// Métriques personnalisées
const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Durée des requêtes HTTP en millisecondes',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 500]
});

const httpRequestsTotal = new prometheus.Counter({
    name: 'http_requests_total',
    help: 'Nombre total de requêtes HTTP',
    labelNames: ['method', 'route', 'status_code']
});

export const metricsMiddleware = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const route = req.route?.path || req.path;
        
        httpRequestDuration
            .labels(req.method, route, res.statusCode)
            .observe(duration);
            
        httpRequestsTotal
            .labels(req.method, route, res.statusCode)
            .inc();
    });
    
    next();
};

// Route pour exposer les métriques
app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
});
```

---

Cette architecture démontre les meilleures pratiques du développement backend moderne : sécurité, performance, maintenabilité et observabilité ! 🚀
