import pool from "../config/database.js";

export async function create(data) {
    const { text, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
        [text, userId]
    );
    return result;
}

export async function getAll() {
    const [rows] = await pool.query("SELECT * FROM ideas");
    return rows;
}

export async function findByUserId(userId) {
    const [rows] = await pool.query("SELECT * FROM ideas WHERE user_id=?", [
        userId,
    ]);
    return rows;
}

export async function update(data) {
    const { text, userId, id } = data;
    const [result] = await pool.query(
        "UPDATE ideas SET text=?, user_id=? WHERE id=?",
        [text, userId, id]
    );
    return result;
}

export async function remove(id) {
    const [result] = await pool.query(
        "DELETE FROM ideas WHERE id=?", [id]
    );
    return result;
}
