
-- 0. On supprime tout avant de remplir
DROP TABLE IF EXISTS clicks CASCADE;
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Table des Utilisateurs
-- On stocke les infos de connexion.
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Liens (Links)
-- C'est ici qu'on fait le lien entre l'URL longue et le code court.
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    visit_count INTEGER DEFAULT 0 
);

-- 3. Table des Statistiques (Clicks)
-- C'est la table "Big Data". Une ligne est créée à chaque clic.
CREATE TABLE clicks (
    id SERIAL PRIMARY KEY,
    link_id INTEGER REFERENCES links(id) ON DELETE CASCADE,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45), 
    user_agent TEXT, -- Pour savoir si c'est Mobile, Desktop, Chrome, Safari...
    referer TEXT -- Pour savoir d'où vient le visiteur (Facebook, LinkedIn, Direct...)
);

-- INDEX
CREATE INDEX idx_links_short_code ON links(short_code);
CREATE INDEX idx_clicks_link_id ON clicks(link_id);