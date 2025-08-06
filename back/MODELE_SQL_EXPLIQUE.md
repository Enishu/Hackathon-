# 📚 EXPLICATION : Modèle SQL vs Mongoose

## 🤔 **Votre question :**
> "j'ai maintenant un model ideas de fait par mon collègue mais je ne le comprends pas on dirait des routes et pas un modèle de base de donnée comme mongoose et mongodb"

## ✅ **Réponse :**
Votre collègue a fait un **modèle SQL** (MySQL/PostgreSQL) et non Mongoose (MongoDB). C'est normal que ça paraisse différent !

---

## 🔍 **Différences entre SQL et Mongoose :**

### 🍃 **Mongoose (MongoDB) - Ce que vous connaissez :**
```javascript
// 1. Définition du schéma
const ideaSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// 2. Modèle
const Idea = mongoose.model('Idea', ideaSchema);

// 3. Utilisation (plus "automatique")
const ideas = await Idea.find(); // Récupère tout
const idea = await Idea.findById(id); // Par ID
await Idea.create(data); // Créer
await Idea.findByIdAndUpdate(id, data); // Modifier
await Idea.findByIdAndDelete(id); // Supprimer
```

### 🐘 **SQL (MySQL/PostgreSQL) - Ce que votre collègue a fait :**
```javascript
// 1. Import de la connection à la base
import pool from "../config/database.js";

// 2. Fonctions avec requêtes SQL brutes
export async function getAll() {
    const [rows] = await pool.query("SELECT * FROM ideas");
    return rows;
}

export async function create(data) {
    const { text, userId } = data;
    const [result] = await pool.query(
        "INSERT INTO ideas (text, user_id) VALUES (?, ?)",
        [text, userId]
    );
    return result;
}
```

---

## 🎯 **Comment utiliser le modèle SQL dans vos controllers :**

```javascript
// ✅ AVANT (avec TODOs)
export const getAllIdeas = async (req, res) => {
  try {
    // TODO: Implémenter la récupération des idées
    res.status(200).json({ data: [] });
  } catch (error) {
    // ...
  }
};

// ✅ MAINTENANT (avec le modèle SQL)
import * as IdeaModel from '../models/Ideas.js';

export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await IdeaModel.getAll(); // ✅ Appelle la fonction SQL
    res.status(200).json({ 
      success: true,
      data: ideas 
    });
  } catch (error) {
    // ...
  }
};
```

---

## 📝 **Fonctions disponibles dans le modèle Ideas.js :**

| Fonction | Description | Utilisation |
|----------|-------------|-------------|
| `getAll()` | Récupère toutes les idées | `await IdeaModel.getAll()` |
| `create(data)` | Crée une nouvelle idée | `await IdeaModel.create({ text, userId })` |
| `findByUserId(userId)` | Idées d'un utilisateur | `await IdeaModel.findByUserId(userId)` |
| `update(data)` | Modifie une idée | `await IdeaModel.update({ text, userId, id })` |
| `remove(id)` | Supprime une idée | `await IdeaModel.remove(id)` |

---

## 🚀 **Résultat final :**

✅ **Votre controller est maintenant connecté au modèle SQL !**
- Toutes les routes fonctionnent
- Plus de TODOs
- Structure claire et simple
- Compatible avec votre base de données SQL

---

## 📌 **En résumé :**
- **Mongoose** = Abstraction pour MongoDB (plus simple)
- **SQL** = Requêtes directes en base (plus de contrôle)
- **Votre collègue** = A choisi SQL pour le projet
- **Votre job** = Connecter les controllers aux fonctions SQL ✅

**C'est exactement ce qu'on vient de faire ! 🎉**
