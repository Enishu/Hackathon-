import pool from "../config/database.js";

export async function link(data) {
    const { ideaId, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO likes (idea_id, user_id) VALUES (?, ?)",
        [ideaId, userId]
    );
    return result;
}

export async function unlink(data) {
    const { ideaId, userId } = data;
    const [result] = await pool.query(
        "DELETE FROM likes WHERE idea_id=? AND user_id=?",
        [ideaId, userId]
    );
    return result;
}
