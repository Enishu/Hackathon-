const db = require('./db');

const Idea = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM idea');
    return rows;
  },

  async create({ text, release_date, id_category, id_user }) {
    const [result] = await db.query(
      'INSERT INTO idea (text, release_date, id_category, id_user) VALUES (?, ?, ?, ?)',
      [text, release_date, id_category, id_user]
    );
    return { id_idea: result.insertId };
  }
};

module.exports = Idea;
