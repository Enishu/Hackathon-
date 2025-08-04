const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); // Parse les formulaires

// Routes principales
app.use('/api/ideas', require('./src/routes/ideas'));
app.use('/api/categories', require('./src/routes/categories'));

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ ok: true });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/api/test`);
});

module.exports = app;