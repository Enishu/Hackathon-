import pool from "../config/database.js";

export async function create(data) {
    const { text, ideaId, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO comments (text, idea_id, user_id) VALUES (?, ?, ?)",
        [text, ideaId, userId]
    );
    return result;
}

export async function findByIdeaId(ideaId) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE idea_id=?", [
        ideaId,
    ]);
    return rows;
}

export async function findByUserId(userId) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE user_id=?", [
        userId,
    ]);
    return rows;
}

export async function update(data) {
    const { text, ideaId, userId, id } = data;
    const [result] = await pool.query(
        "UPDATE comments SET text=?, idea_id=?, user_id=? WHERE id=?",
        [text, ideaId, userId, id]
    );
    return result;
}

export async function remove(id) {
    const [result] = await pool.query("DELETE FROM comments WHERE id=?", [id]);
    return result;
}
