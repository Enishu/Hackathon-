import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const applySecurityMiddlewares = (app, host, port) => {
    // Cors
    const corsOptions = {
        origin: process.env.CORS_ORIGIN || `${host}:${port}`,  // adresse du frontend
        credentials: true,
    };
    app.use(cors(corsOptions));

    // Rate limit (max 100 requêtes toutes les 15 minutes)
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limite chaque IP à 100 requêtes
        message: "Trop de requêtes, réessayez plus tard.",
    });
    app.use(limiter);

    // Helmet
    app.use(helmet());
};

export default applySecurityMiddlewares;
