const db = require('./db');

const User = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id_user = ?', [id]);
    return rows[0];
  },

  async create({ name, firstName, email, id_avatar = null }) {
    const [result] = await db.query(
      'INSERT INTO users (name, firstName, email, id_avatar) VALUES (?, ?, ?, ?)',
      [name, firstName, email, id_avatar]
    );
    return { id_user: result.insertId };
  },

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const updates = keys.map(k => `${k} = ?`).join(', ');
    const [result] = await db.query(
      `UPDATE users SET ${updates} WHERE id_user = ?`,
      [...values, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id_user = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = User;
