import mysql from 'mysql2/promise';
import env from './env.js';

// Connexion simple à la base MySQL
let connection = null;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection(env.DB_URI);
    console.log('✅ Connecté à MySQL');
  }
  return connection;
}

// Fonction simple pour exécuter une requête
export async function query(sql, params = []) {
  const conn = await getConnection();
  const [rows] = await conn.execute(sql, params);
  return rows;
}
