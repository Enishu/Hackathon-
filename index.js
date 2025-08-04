import env from "./src/config/env.js";
import express from "express";
import applySecurityMiddlewares from "./src/middlewares/security.js";
import authRoutes from "./src/routes/authRoutes.js";
import { deleteUnverifiedUsers } from "./src/middlewares/scheduledTasks.js";

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

// Lancement du serveur
app.listen(env.SERVER_PORT, () => {
    console.log(`Serveur lancé sur http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});