const db = require('./db');

const CommentLike = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM comment_like');
    return rows;
  },

  async create({ id_likes, id_idea }) {
    const [result] = await db.query(
      'INSERT INTO comment_like (id_likes, id_idea) VALUES (?, ?)',
      [id_likes, id_idea]
    );
    return result.affectedRows > 0;
  }
};

module.exports = CommentLike;
