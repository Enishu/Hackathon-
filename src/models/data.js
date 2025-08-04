// Structure temporaire des données (en attendant une vraie DB)
// La vraie base de données sera en SQL.

let ideas = [];
let likes = [];
let comments = [];
let categories = [
  { id: 1, name: 'Cognitif', icon: '🧠' },
  { id: 2, name: 'Visuel', icon: '👁️' },
  { id: 3, name: 'Auditif', icon: '👂' },
  { id: 4, name: 'Moteur', icon: '🦽' },
  { id: 5, name: 'Education', icon: '📚' },
  { id: 6, name: 'Mobilité', icon: '🚗' },
  { id: 7, name: 'Santé', icon: '🏥' },
  { id: 8, name: 'Urbanisme', icon: '🏙️' },
  { id: 9, name: 'Autres', icon: '✨' }
];
let users = [];

module.exports = {
  ideas,
  likes,
  comments,
  categories,
  users
};
