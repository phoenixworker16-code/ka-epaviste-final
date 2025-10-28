-- Données de base pour KA Auto Épaves
-- À exécuter après la création des tables

-- Zones d'intervention (basé sur le Loiret et environs)
INSERT INTO intervention_zones (name, postal_codes, description, is_active, max_distance_km) VALUES
('Orléans Métropole', ARRAY['45000', '45100', '45200', '45400', '45500', '45700', '45800'], 'Zone principale autour d''Orléans', true, 30),
('Nord Loiret', ARRAY['45120', '45130', '45140', '45150', '45160', '45170', '45190'], 'Secteur nord du département', true, 40),
('Sud Loiret', ARRAY['45230', '45240', '45250', '45260', '45270', '45290'], 'Secteur sud du département', true, 40),
('Est Loiret', ARRAY['45300', '45310', '45320', '45330', '45340', '45350'], 'Secteur est incluant Montargis', true, 50),
('Ouest Loiret', ARRAY['45410', '45420', '45430', '45440', '45450', '45460'], 'Secteur ouest du département', true, 45)
ON CONFLICT (name) DO NOTHING;

-- Types de véhicules
INSERT INTO vehicle_types (category, subcategory, max_weight_kg, requires_special_equipment, equipment_needed, base_removal_price, scrap_value_estimate, description, is_active) VALUES
('voiture', 'citadine', 1200, false, ARRAY[]::TEXT[], 0.00, 150.00, 'Petites voitures urbaines', true),
('voiture', 'berline', 1800, false, ARRAY[]::TEXT[], 0.00, 200.00, 'Berlines classiques', true),
('voiture', 'break', 2000, false, ARRAY[]::TEXT[], 0.00, 180.00, 'Voitures familiales break', true),
('voiture', '4x4', 2500, false, ARRAY[]::TEXT[], 0.00, 250.00, 'Véhicules tout-terrain', true),
('utilitaire', 'fourgonnette', 3500, true, ARRAY['plateau'], 0.00, 300.00, 'Petits utilitaires', true),
('utilitaire', 'fourgon', 5000, true, ARRAY['plateau', 'grue'], 0.00, 400.00, 'Fourgons moyens et grands', true),
('moto', 'scooter', 200, false, ARRAY[]::TEXT[], 0.00, 50.00, 'Scooters et motos légères', true),
('moto', 'moto', 400, false, ARRAY[]::TEXT[], 0.00, 100.00, 'Motos standard', true),
('camion', 'porteur', 12000, true, ARRAY['grue', 'plateau_lourd'], 0.00, 800.00, 'Camions porteurs', true),
('autre', 'agricole', 8000, true, ARRAY['grue', 'plateau'], 0.00, 500.00, 'Matériel agricole', true)
ON CONFLICT DO NOTHING;

-- Paramètres système de base
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
-- Paramètres business
('company_name', 'KA Auto Épaves', 'string', 'Nom de l''entreprise', 'business', true),
('company_phone', '+33 6 63 83 03 03', 'string', 'Téléphone principal', 'business', true),
('company_email', 'contact@ka-auto-epaves.fr', 'string', 'Email de contact', 'business', true),
('company_address', 'Loiret, France', 'string', 'Adresse de l''entreprise', 'business', true),

-- Horaires
('business_hours', '{"lundi": "8h-18h", "mardi": "8h-18h", "mercredi": "8h-18h", "jeudi": "8h-18h", "vendredi": "8h-18h", "samedi": "8h-12h", "dimanche": "fermé"}', 'json', 'Horaires d''ouverture', 'business', true),

-- Paramètres opérationnels
('max_photos_per_request', '5', 'number', 'Nombre maximum de photos par demande', 'technical', false),
('max_photo_size_mb', '5', 'number', 'Taille maximum des photos en MB', 'technical', false),
('default_response_time_hours', '24', 'number', 'Délai de réponse standard en heures', 'business', true),
('free_removal_radius_km', '50', 'number', 'Rayon d''enlèvement gratuit en km', 'business', true),

-- Paramètres de notification
('admin_notification_email', 'admin@ka-auto-epaves.fr', 'string', 'Email pour les notifications admin', 'technical', false),
('send_confirmation_emails', 'true', 'boolean', 'Envoyer des emails de confirmation', 'technical', false),
('send_sms_notifications', 'false', 'boolean', 'Envoyer des SMS de notification', 'technical', false),

-- Paramètres d'affichage
('site_maintenance_mode', 'false', 'boolean', 'Mode maintenance du site', 'technical', false),
('show_testimonials', 'true', 'boolean', 'Afficher les témoignages', 'ui', true),
('max_testimonials_homepage', '6', 'number', 'Nombre de témoignages sur la page d''accueil', 'ui', true),

-- Réseaux sociaux
('facebook_url', '', 'string', 'URL de la page Facebook', 'business', true),
('instagram_url', '', 'string', 'URL du compte Instagram', 'business', true),
('linkedin_url', '', 'string', 'URL de la page LinkedIn', 'business', true),

-- SEO
('site_description', 'Enlèvement gratuit d''épaves automobiles dans le Loiret. Service rapide et professionnel pour tous types de véhicules hors d''usage.', 'string', 'Description du site pour le SEO', 'ui', true),
('site_keywords', 'épave, enlèvement, gratuit, Loiret, Orléans, automobile, véhicule, destruction', 'string', 'Mots-clés pour le SEO', 'ui', true)

ON CONFLICT (setting_key) DO NOTHING;

-- Quelques témoignages d'exemple (à modérer)
INSERT INTO testimonials (customer_name, customer_city, rating, title, content, is_approved, is_featured, source, display_order) VALUES
('Marie D.', 'Orléans', 5, 'Service impeccable', 'Enlèvement rapide et professionnel. L''équipe est arrivée à l''heure et a tout géré sans problème. Je recommande !', true, true, 'website', 1),
('Pierre M.', 'Montargis', 5, 'Très satisfait', 'Ma vieille voiture a été enlevée gratuitement comme promis. Personnel très aimable et service efficace.', true, true, 'website', 2),
('Sophie L.', 'Gien', 4, 'Bon service', 'Prise de contact rapide et enlèvement dans les délais. Rien à redire sur la prestation.', true, false, 'website', 3),
('Jean-Claude R.', 'Pithiviers', 5, 'Parfait !', 'Après l''accident, je ne savais pas quoi faire de ma voiture. KA Auto Épaves s''est occupé de tout. Merci !', true, true, 'website', 4)
ON CONFLICT DO NOTHING;

-- Mise à jour des timestamps
UPDATE intervention_zones SET updated_at = NOW();
UPDATE system_settings SET updated_at = NOW();
UPDATE testimonials SET updated_at = NOW();