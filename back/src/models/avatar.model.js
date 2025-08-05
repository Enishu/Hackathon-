const db = require('./db');

const Avatar = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM avatar');
    return rows;
  },

  async create(avaadress) {
    const [result] = await db.query(
      'INSERT INTO avatar (avaadress) VALUES (?)',
      [avaadress]
    );
    return { id_avatar: result.insertId };
  }
};

module.exports = Avatar;
