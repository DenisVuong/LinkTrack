-- Généré par Gemini
/*
-- 1. On nettoie tout avant de remplir
TRUNCATE TABLE clicks, links, user_roles, roles, users RESTART IDENTITY CASCADE;

-- 2. Création des Rôles
INSERT INTO roles (id, name) VALUES 
(1, 'user'),
(2, 'moderator'),
(3, 'admin');

-- 3. Création des Utilisateurs
INSERT INTO users (username, email, password) VALUES 
('denis', 'denis@test.com', '$2a$08$gXi/s9.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0'), -- dummy hash
('recruteur', 'recruteur@entreprise.com', '$2a$08$gXi/s9.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0');

-- 3.1 Assignation des Rôles
INSERT INTO user_roles (user_id, role_id) VALUES 
(1, 3), -- Denis est Admin
(1, 1), -- Denis est aussi User
(2, 1); -- Recruteur est User

-- 4. Création de liens (Rattachés aux utilisateurs créés au-dessus)
INSERT INTO links (user_id, original_url, short_code, visit_count, created_at) VALUES 
(1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'rickroll', 4, NOW() - INTERVAL '7 days'),
(1, 'https://github.com/denisvuong', 'mongit', 2, NOW() - INTERVAL '3 days'),
(2, 'https://www.linkedin.com/', 'linkedin', 0, NOW() - INTERVAL '1 day');


-- 5. Simulation de CLICS (La partie Analytics)
-- On simule des clics sur le lien 'rickroll' (ID 1) venant de différents appareils
INSERT INTO clicks (link_id, ip_address, user_agent, referer, clicked_at) VALUES 
(1, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0)', 'https://google.com/', NOW() - INTERVAL '5 days'),
(1, '10.0.0.42', 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', 'https://twitter.com/', NOW() - INTERVAL '4 days'),
(1, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0)', 'Direct', NOW() - INTERVAL '2 days'),
(1, '44.55.66.77', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14)', 'https://facebook.com/', NOW() - INTERVAL '1 hour'),
(2, '88.99.100.101', 'Mozilla/5.0 (Linux; Android 10)', 'https://t.co/', NOW() - INTERVAL '2 days'),
(2, '192.168.1.55', 'Mozilla/5.0 (Windows NT 10.0)', 'Direct', NOW() - INTERVAL '1 day');

*/