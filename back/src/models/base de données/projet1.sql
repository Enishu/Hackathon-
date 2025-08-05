-- fichier : projet1.sql, j'ai fignolé pour les contraintes.


CREATE DATABASE IF NOT EXISTS projet1 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projet1;

-- Table : avatar
CREATE TABLE avatar (
    id_avatar INT PRIMARY KEY AUTO_INCREMENT,
    avaadress VARCHAR(255) NOT NULL CHECK (avaadress <> '')
);

-- Table : ico
CREATE TABLE ico (
    id_ico INT PRIMARY KEY AUTO_INCREMENT,
    Fileadress VARCHAR(255) NOT NULL CHECK (Fileadress <> '')
);

-- Table : category
CREATE TABLE category (
    id_primary INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL CHECK (LENGTH(name) >= 2),
    id_icon INT UNIQUE,
    FOREIGN KEY (id_icon) REFERENCES ico(id_ico)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table : users
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL CHECK (LENGTH(name) >= 2),
    firstName VARCHAR(100) NOT NULL CHECK (LENGTH(firstName) >= 2),
    email VARCHAR(150) NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
    id_avatar INT,
    FOREIGN KEY (id_avatar) REFERENCES avatar(id_avatar)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table : idea
CREATE TABLE idea (
    id_idea INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL CHECK (LENGTH(text) >= 10),
    release_date DATE NOT NULL CHECK (release_date <= CURRENT_DATE),
    id_category INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id_primary)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table : comment
CREATE TABLE comment (
    id_comment INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL CHECK (LENGTH(text) >= 2),
    id_idea INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_idea) REFERENCES idea(id_idea)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table : likes
CREATE TABLE likes (
    id_like INT PRIMARY KEY AUTO_INCREMENT,
    id_idea INT NOT NULL,
    id_user INT NOT NULL,
    UNIQUE (id_idea, id_user), -- Un utilisateur ne peut liker une idée qu'une seule fois
    FOREIGN KEY (id_idea) REFERENCES idea(id_idea)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table : comment_like
CREATE TABLE comment_like (
    id_likes INT,
    id_idea INT,
    PRIMARY KEY (id_likes, id_idea),
    FOREIGN KEY (id_likes) REFERENCES likes(id_like)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_idea) REFERENCES idea(id_idea)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
