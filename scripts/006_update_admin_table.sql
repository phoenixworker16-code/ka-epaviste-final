-- Mise à jour de la table admin_users pour l'authentification locale
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Supprimer la contrainte sur id si elle existe
ALTER TABLE admin_users ALTER COLUMN id DROP NOT NULL;
ALTER TABLE admin_users ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Créer un index sur l'email pour les performances
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_reset_token ON admin_users(reset_token);