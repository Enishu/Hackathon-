const db = require('./db');

const Category = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM category');
    return rows;
  },

  async create({ name, id_icon = null }) {
    const [result] = await db.query(
      'INSERT INTO category (name, id_icon) VALUES (?, ?)',
      [name, id_icon]
    );
    return { id_primary: result.insertId };
  }
};

module.exports = Category;
