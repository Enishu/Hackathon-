import cron from "node-cron";
import * as User from "../models/User.js";

// toutes les 30 minutes (00 et 30)
export const deleteUnverifiedUsers = cron.schedule("*/30 * * * *", async () => {
    console.log("Suppression automatique des utilisateurs non vérifiés...");
    try {
        const result = await User.deleteUnverifiedUsers();
        console.log("Utilisateurs supprimés :", result.affectedRows);
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
    }
});
