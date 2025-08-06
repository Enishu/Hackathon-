import pool from "../config/database.js";

export async function create(data) {
    const { name, iconUrl } = data;
    const [result] = await pool.query(
        "INSERT INTO categories (name, icon_url) VALUES (?, ?)",
        [name, iconUrl]
    );
    return result;
}

export async function getAll() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
}

export async function update(data) {
    const { name, iconUrl, id } = data;
    const [result] = await pool.query(
        "UPDATE categories SET name=?, icon_url=? WHERE id=?",
        [name, iconUrl, id]
    );
    return result;
}

export async function remove(id) {
    const [result] = await pool.query("DELETE FROM categories WHERE id=?", [
        id,
    ]);
    return result;
}
