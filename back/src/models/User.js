import pool from "../config/database.js";

export async function create(data) {
    const { avatar, email, hashedPassword, emailTokenExpiresAt } = data;
    const [result] = await pool.query(
        "INSERT INTO users (avatar, email, hashed_password, email_token_expires_at) VALUES (?, ?, ?, ?)",
        [avatar, email, hashedPassword, emailTokenExpiresAt]
    );
    return result;
}

export async function findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [
        email,
    ]);
    return rows[0];
}

export async function confirmVerification(email) {
    const [result] = await pool.query(
        "UPDATE users SET is_verified=TRUE WHERE email=?",
        [email]
    );
    return result;
}

export async function recordLastLogin(email) {
    const date = new Date();
    const [result] = await pool.query(
        "UPDATE users SET last_login_at=? WHERE email=?",
        [date, email]
    );
    return result;
}

export async function update(data) {
    const { id, avatar, email, hashedPassword, emailTokenExpiresAt } = data;
    const [result] = await pool.query(
        "UPDATE users SET avatar=?, email=?, hashed_password=?, email_token_expires_at=? WHERE id=?",
        [avatar, email, hashedPassword, emailTokenExpiresAt, id]
    );
    return result;
}

export async function deleteUnverifiedUsers() {
    const [result] = await pool.query(
        "DELETE FROM users WHERE is_verified = false AND email_token_expires_at < NOW()"
    );
    return result;
}
