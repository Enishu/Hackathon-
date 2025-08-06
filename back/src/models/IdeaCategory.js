import pool from "../config/database.js";

export async function link(data) {
    const { ideaId, categoryId } = data;
    const [result] = await pool.query(
        "INSERT INTO idea_category (idea_id, category_id) VALUES (?, ?)",
        [ideaId, categoryId]
    );
    return result;
}

export async function unlink(data) {
    const { ideaId, categoryId } = data;
    const [result] = await pool.query(
        "DELETE FROM idea_category WHERE idea_id=? AND category_id=?",
        [ideaId, categoryId]
    );
    return result;
}
