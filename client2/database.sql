-- =============================
-- Création des tables de base
-- =============================

DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS commentaires;
DROP TABLE IF EXISTS idee_handicap;
DROP TABLE IF EXISTS idees;
DROP TABLE IF EXISTS handicaps;
DROP TABLE IF EXISTS themes;

-- Table : themes
CREATE TABLE themes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL
);

-- Table : handicaps
CREATE TABLE handicaps (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL
);

-- Table : idees
CREATE TABLE idees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  theme_id INT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- Table pivot : idee_handicap
CREATE TABLE idee_handicap (
  idee_id INT,
  handicap_id INT,
  PRIMARY KEY (idee_id, handicap_id),
  FOREIGN KEY (idee_id) REFERENCES idees(id) ON DELETE CASCADE,
  FOREIGN KEY (handicap_id) REFERENCES handicaps(id) ON DELETE CASCADE
);

-- Table : commentaires
CREATE TABLE commentaires (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idee_id INT NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idee_id) REFERENCES idees(id) ON DELETE CASCADE
);

-- Table : likes
CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idee_id INT NOT NULL,
  date_like DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idee_id) REFERENCES idees(id) ON DELETE CASCADE
);

-- =============================
-- Insertion des thèmes
-- =============================

INSERT INTO themes (nom) VALUES 
('Éducation'),
('Santé'),
('Transport'),
('Loisir'),
('Urbanisme'),
('Sport');

-- =============================
-- Insertion des types de handicap
-- =============================

INSERT INTO handicaps (nom) VALUES 
('Cognitif'),
('Auditif'),
('Visuel'),
('Moteur');
