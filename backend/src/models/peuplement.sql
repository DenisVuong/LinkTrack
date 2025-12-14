-- Généré par Gemini

-- 1. On nettoie tout avant de remplir (pour éviter les erreurs de doublons)

TRUNCATE TABLE clicks, links, users RESTART IDENTITY CASCADE;

-- 2. Création de 2 utilisateurs fictifs

INSERT INTO users (email, password_hash) VALUES 
('denis@test.com', 'hash_securise_123'),
('recruteur@entreprise.com', 'hash_securise_456');

-- 3. Création de liens (Rattachés aux utilisateurs créés au-dessus)

INSERT INTO links (user_id, original_url, short_code, visit_count, created_at) VALUES 
(1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'rickroll', 4, NOW() - INTERVAL '7 days'),
(1, 'https://github.com/denisvuong', 'mongit', 2, NOW() - INTERVAL '3 days'),
(2, 'https://www.linkedin.com/', 'linkedin', 0, NOW() - INTERVAL '1 day');


-- 4. Simulation de CLICS (La partie Analytics)
-- On simule des clics sur le lien 'rickroll' (ID 1) venant de différents appareils

INSERT INTO clicks (link_id, ip_address, user_agent, referer, clicked_at) VALUES 
(1, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0)', 'https://google.com/', NOW() - INTERVAL '5 days'),
(1, '10.0.0.42', 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', 'https://twitter.com/', NOW() - INTERVAL '4 days'),
(1, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0)', 'Direct', NOW() - INTERVAL '2 days'),
(1, '44.55.66.77', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14)', 'https://facebook.com/', NOW() - INTERVAL '1 hour'),
(2, '88.99.100.101', 'Mozilla/5.0 (Linux; Android 10)', 'https://t.co/', NOW() - INTERVAL '2 days'),
(2, '192.168.1.55', 'Mozilla/5.0 (Windows NT 10.0)', 'Direct', NOW() - INTERVAL '1 day');