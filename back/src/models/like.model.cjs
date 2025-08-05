const db = require('./db');

const Like = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM likes');
    return rows;
  },

  async create({ id_idea, id_user }) {
    const [result] = await db.query(
      'INSERT INTO likes (id_idea, id_user) VALUES (?, ?)',
      [id_idea, id_user]
    );
    return { id_like: result.insertId };
  }
};

module.exports = Like;
