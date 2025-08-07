import env from "../config/env.js";
import * as User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailSender.js";

export async function register(req, res) {
    try {
        const { username, email, password, passwordConfirm } = req.body;

        // Vérifications de saisie
        if (!username || !email || !password || !passwordConfirm)
            return res
                .status(400)
                .json({ error: `Tous les champs sont requis.` });

        if (password !== passwordConfirm)
            return res
                .status(400)
                .json({ error: `Les mots de passe ne correspondent pas.` });

        const user = await User.findByEmail(email);
        // Si compte vérifié existe
        if (user?.is_verified)
            return res.status(409).json({ error: `Cet email existe déjà.` });

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un token pour la vérification de l'email
        const token = jwt.sign({ email }, env.JWT_SECRET, {
            expiresIn: env.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
        });
        const emailTokenExpiresAt = new Date(jwt.decode(token).exp * 1000);

        // Si l'utilisateur existe mais n'est pas vérifié
        // Actualisation de la base avec les nouvelles données
        if (user && !user.is_verified)
            await User.update({
                id: user.id,
                username,
                email,
                hashedPassword,
                emailTokenExpiresAt,
            });
        else {
            // Sinon, création de l'utilisateur
            await User.create({
                username,
                email,
                hashedPassword,
                emailTokenExpiresAt,
            });
        }

        // Création de l'email de validation
        const url = `http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/auth/verify-email/${token}`;

        sendEmail({
            to: email,
            subject: `Veuillez confirmer votre adresse email`,
            html: `
            <h1>Vous y êtes presque !</h1>
            <p>Pour assurer la sécurité de votre compte, nous devons vérifier votre adresse e-mail.</p>
            <p><a href="${url}">Vérifier l'adresse email</a></p>
            <p><em>Ce lien est valable pendant 1h</em></p>
            `,
        });
        res.status(201).json({
            message: "Utilisateur créé. Un email de vérification a été envoyé.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Le serveur a rencontré une erreur.` });
    }
}

export async function verifyEmail(req, res) {
    try {
        const { token } = req.params;

        const { email } = jwt.verify(token, env.JWT_SECRET);

        const result = await User.confirmVerification(email);
        if (!result.affectedRows)
            res.status(404).json({
                error: `L'email ne peut pas être vérifié. Veuillez vous réinscrire.`,
            });

        res.status(201).json({ message: `L'email ${email} a été vérifié.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Le serveur a rencontré une erreur.` });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Vérifications de la saisie
        if (!email || !password)
            return res
                .status(400)
                .json({ error: `Tous les champs sont requis.` });

        // Vérification des identifiants (y compris vérification de l'email)
        const user = await User.findByEmail(email);
        if (
            !user?.is_verified ||
            !(await bcrypt.compare(password, user.hashed_password))
        ) {
            return res.status(401).json({
                error: "Email ou mot de passe incorrect",
            });
        }

        // Génération du token de connexion
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
        );

        // Enregistre la connexion dans la base
        await User.recordLastLogin(email);

        res.status(200).json({ message: `Connexion réussie.`, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Le serveur a rencontré une erreur.` });
    }
}

export async function forgottenPassword(req, res) {
    try {
        const { email } = req.body;

        // Vérifications de la saisie
        if (!email)
            return res.status(400).json({ error: `L'email est requis.` });

        // Vérification de l'email
        const user = await User.findByEmail(email);
        if (!user?.is_verified) {
            return res.status(404).json({
                error: "L'email n'existe pas.",
            });
        }

        // Création d'un token pour la réinitialisation du mot de passse
        const token = jwt.sign({ email }, env.JWT_SECRET, {
            expiresIn: env.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
        });
        const emailTokenExpiresAt = new Date(jwt.decode(token).exp * 1000);

        // Actualisation de la base avec le nouveau délai d'expiration
        await User.updateEmailTokenExpiration({
            email,
            emailTokenExpiresAt,
        });

        // Création de l'email de validation
        const url = `http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/auth/reset-password/${token}`;

        sendEmail({
            to: email,
            subject: `Votre demande de reinitialisation de mot de passe`,
            html: `
            <h1>Vous y êtes presque !</h1>
            <p>Vous venez de soumettre une demande de réinitialisation de votre mot de passe.</p>
            <p>Nous vous invitons à cliquer sur le bouton ci-dessous afin d’en choisir un nouveau.</p>
            <p><a href="${url}">Reinitialiser mon mot de passe</a></p>
            <p><em>Ce lien est valable pendant 1h</em></p>
            `,
        });
        res.status(201).json({
            message: "Un email de réinitialisation a été envoyé.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Le serveur a rencontré une erreur.` });
    }
}

export async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { password, passwordConfirm } = req.body;

        const { email } = jwt.verify(token, env.JWT_SECRET);

        // Vérifications de saisie
        if (!password || !passwordConfirm)
            return res
                .status(400)
                .json({ error: `Tous les champs sont requis.` });

        if (password !== passwordConfirm)
            return res
                .status(400)
                .json({ error: `Les mots de passe ne correspondent pas.` });

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualisation de la base avec le nouveau mot de passe
        await User.updatePassword({
            email,
            hashedPassword,
        });

        res.status(201).json({
            message: "Le nouveau mot de passe a été enregistré",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Le serveur a rencontré une erreur.` });
    }
}
