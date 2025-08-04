import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import env from './src/config/env.js';

// Import des routes
import ideasRoutes from './src/routes/ideas.js';
import categoriesRoutes from './src/routes/categories.js';
import authRoutes from './src/routes/authRoutes.js';

// Import des middlewares
import { securityMiddleware } from './src/middlewares/security.js';

const app = express();
const PORT = env.SERVER_PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
});

// Middleware de sécurité
app.use(helmet());
app.use(limiter);
app.use(securityMiddleware);

// CORS
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Sessions
app.use(session({
  secret: env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // true en production avec HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
  }
}));

// Routes principales
app.use('/api/ideas', ideasRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'API opérationnelle',
    timestamp: new Date().toISOString()
  });
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/api/test`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;