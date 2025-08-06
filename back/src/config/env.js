import "dotenv/config";
import { cleanEnv, host, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
    // Serveur
    SERVER_HOST: host({ devDefault: "localhost" }),
    SERVER_PORT: port({ devDefault: 3000 }),

    // Cors
    CORS_ORIGIN: url({ devDefault: "http://localhost:3000" }),

    // Base de données
    DB_URI: url(),

    // JWT
    JWT_SECRET: str({ devDefault: "MonSuperSecretDeLaMortQuiTue" }),
    JWT_EMAIL_VERIFICATION_EXPIRES_IN: str({ default: "1h" }),
    JWT_ACCESS_EXPIRES_IN: str({ devDefault: "24h" }),

    // Nodemailer
    EMAIL_SERVICE: str(),
    EMAIL_USER: str(),
    EMAIL_PASS: str(),
    EMAIL_FROM: str({ devDefault: "Mon application <noreply@nodomain.com>" }),
});

export default env;

// librairie de validation d'environnement qui sert à vérifier que les variables d'environnement sont bien définies et au bon format cela peremet de s'assurer que l'application ne démarre pas si les variables d'environnement sont manquantes ou incorrectes. Il écrit les variables d'environnement dans un fichier .env.local pour les utiliser en développement.
