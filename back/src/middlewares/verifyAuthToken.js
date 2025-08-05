import env from '../config/env.js'
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;

        if (!authHeaders) {
            return res.status(401).json({ error: "Token absent." });
        }

        if (!authHeaders.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Format du token invalide." });
        }

        const token = authHeaders.split(" ")[1];
        req.user = jwt.verify(token, env.JWT_SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: `Token invalide ou expiré` });
    }
};

export default auth;
