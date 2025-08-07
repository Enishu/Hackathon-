import pool from "../config/database.js";

export async function create(data) {
    const { text, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
        [text, userId]
    );
    return result;
}

export async function getAll(data) {
    const { order, limit, offset } = data;
    const query_elements = [`SELECT * FROM ideas`];
    const params = [];
    if (["ASC", "DESC"].includes(order)) {
        query_elements.push(`ORDER BY created_at ?`);
        params.push(order);
    }
    if (limit > 0) {
        query_elements.push(`LIMIT ?`);
        params.push(limit);
    }
    if (offset > 0) {
        query_elements.push(`OFFSET ?`);
        params.push(offset);
    }
    const query = query_elements.join(" ");
    const [rows] = await pool.query(query, params);
    return rows;
}

export async function findById(id) {
    const [rows] = await pool.query("SELECT * FROM ideas WHERE id=?", [id]);
    return rows.length ? rows[0] : null;
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
    const [result] = await pool.query("DELETE FROM ideas WHERE id=?", [id]);
    return result;
}
