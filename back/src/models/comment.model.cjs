const db = require('./db');

const Comment = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM comment');
    return rows;
  },

  async create({ text, id_idea, id_user }) {
    const [result] = await db.query(
      'INSERT INTO comment (text, id_idea, id_user) VALUES (?, ?, ?)',
      [text, id_idea, id_user]
    );
    return { id_comment: result.insertId };
  }
};

module.exports = Comment;
