import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Configuration de DOMPurify pour Node.js
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Middleware de sécurité pour nettoyer les inputs
export const securityMiddleware = (req, res, next) => {
  // Nettoyage des données JSON
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  
  // Nettoyage des query parameters
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};

// Fonction récursive pour nettoyer un objet
const sanitizeObject = (obj) => {
  if (typeof obj === 'string') {
    return purify.sanitize(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned;
  }
  
  return obj;
};

// Middleware de validation des headers
export const validateHeaders = (req, res, next) => {
  const contentType = req.get('Content-Type');
  
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Content-Type doit être application/json'
      });
    }
  }
  
  next();
};
