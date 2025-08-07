import env from "./src/config/env.js";
import express from "express";
import { deleteUnverifiedUsers } from "./src/middlewares/scheduledTasks.js";
import applySecurityMiddlewares from "./src/middlewares/security.js";
import authRoutes from "./src/routes/authRoutes.js";
import ideasRoutes from './src/routes/ideas.js';
import categoriesRoutes from './src/routes/categories.js';

// Création d'une instance Express
const app = express();

// Tâches programmées pour "vider" les utilisateurs non vérifiés de la base de données
deleteUnverifiedUsers.start();

// Middlewares
applySecurityMiddlewares(app, env.SERVER_HOST, env.SERVER_PORT);
app.use(express.json());

// Points d'entrée
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de la boite à idées!");
});

app.use("/api/auth", authRoutes); // Authentification
app.use('/api/ideas', ideasRoutes); // Routes principales des idées qui incluent les sous-routes comments et likes
app.use('/api/categories', categoriesRoutes); // Routes de gestion des catégories

// Lancement du serveur
app.listen(env.SERVER_PORT, () => {
    console.log(`Serveur lancé sur http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});