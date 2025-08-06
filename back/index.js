import env from "./src/config/env.js";
import express from "express";
import { deleteUnverifiedUsers } from "./src/middlewares/scheduledTasks.js";
import applySecurityMiddlewares from "./src/middlewares/security.js";
import authRoutes from "./src/routes/authRoutes.js";
// import ideasRoutes from './src/routes/ideas.js';
// import categoriesRoutes from './src/routes/categories.js';
// import commentsRoutes from './src/routes/comments.js';
// import likesRoutes from './src/routes/likes.js';

// Création d'une instance Express
const app = express();

// Tâches programmées
deleteUnverifiedUsers.start();

// Middlewares
applySecurityMiddlewares(app, env.SERVER_HOST, env.SERVER_PORT);
app.use(express.json());

// Points d'entrée
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de la boite à idées!");
});
app.use("/api/auth", authRoutes);
// app.use('/api/ideas', ideasRoutes);
// app.use('/api/categories', categoriesRoutes);
// app.use('/api/comments', commentsRoutes);
// app.use('/api/likes', likesRoutes);

// Lancement du serveur
app.listen(env.SERVER_PORT, () => {
    console.log(`Serveur lancé sur http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});