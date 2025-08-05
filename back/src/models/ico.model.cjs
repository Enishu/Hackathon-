const db = require('./db');

const Ico = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM ico');
    return rows;
  },

  async create(fileAdress) {
    const [result] = await db.query(
      'INSERT INTO ico (Fileadress) VALUES (?)',
      [fileAdress]
    );
    return { id_ico: result.insertId };
  }
};

module.exports = Ico;
