-- Tables supplémentaires pour KA Auto Épaves
-- Créé après analyse complète du site

-- Table pour les zones d'intervention
CREATE TABLE IF NOT EXISTS intervention_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Informations de la zone
  name TEXT NOT NULL, -- ex: "Loiret", "Orléans et environs"
  postal_codes TEXT[] NOT NULL, -- Array des codes postaux couverts
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  
  -- Tarification (si différente par zone)
  base_price DECIMAL(10,2) DEFAULT 0.00,
  additional_fees DECIMAL(10,2) DEFAULT 0.00,
  
  -- Contraintes géographiques
  max_distance_km INTEGER DEFAULT 50,
  
  UNIQUE(name)
);

-- Table pour les types de véhicules et leurs spécificités
CREATE TABLE IF NOT EXISTS vehicle_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Classification du véhicule
  category TEXT NOT NULL CHECK (category IN ('voiture', 'utilitaire', 'moto', 'camion', 'autre')),
  subcategory TEXT, -- ex: "berline", "break", "4x4"
  
  -- Contraintes techniques
  max_weight_kg INTEGER,
  requires_special_equipment BOOLEAN DEFAULT false,
  equipment_needed TEXT[], -- ex: ["grue", "plateau"]
  
  -- Tarification
  base_removal_price DECIMAL(10,2) DEFAULT 0.00,
  scrap_value_estimate DECIMAL(10,2) DEFAULT 0.00,
  
  -- Métadonnées
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Table pour le suivi des enlèvements (planning)
CREATE TABLE IF NOT EXISTS pickup_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Référence à la demande
  removal_request_id UUID NOT NULL REFERENCES removal_requests(id) ON DELETE CASCADE,
  
  -- Planning
  scheduled_date DATE NOT NULL,
  scheduled_time_start TIME,
  scheduled_time_end TIME,
  estimated_duration_minutes INTEGER DEFAULT 60,
  
  -- Équipe assignée
  assigned_driver TEXT,
  assigned_vehicle TEXT, -- Véhicule de l'entreprise utilisé
  
  -- Statut du planning
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rescheduled')),
  
  -- Notes opérationnelles
  pickup_notes TEXT,
  completion_notes TEXT,
  
  -- Informations de facturation
  actual_cost DECIMAL(10,2),
  payment_received DECIMAL(10,2) DEFAULT 0.00,
  payment_method TEXT CHECK (payment_method IN ('cash', 'check', 'transfer', 'none')),
  
  -- Contraintes
  UNIQUE(removal_request_id, scheduled_date)
);

-- Table pour les contacts/prospects (newsletter, devis)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Informations de contact
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  
  -- Source du contact
  source TEXT NOT NULL CHECK (source IN ('contact_form', 'newsletter', 'phone_call', 'referral', 'other')),
  source_details TEXT, -- Page d'origine, référent, etc.
  
  -- Préférences
  newsletter_subscribed BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Suivi commercial
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'inactive')),
  last_contact_date TIMESTAMP WITH TIME ZONE,
  next_follow_up_date DATE,
  
  -- Notes
  notes TEXT,
  
  -- Éviter les doublons
  UNIQUE(email)
);

-- Table pour les témoignages/avis clients
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Référence à la demande (optionnel)
  removal_request_id UUID REFERENCES removal_requests(id) ON DELETE SET NULL,
  
  -- Informations du témoignage
  customer_name TEXT NOT NULL,
  customer_city TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  
  -- Contenu
  title TEXT,
  content TEXT NOT NULL,
  
  -- Modération
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  moderated_by UUID REFERENCES admin_users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  
  -- Métadonnées
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'google', 'facebook', 'email', 'phone')),
  display_order INTEGER DEFAULT 0
);

-- Table pour les statistiques et métriques
CREATE TABLE IF NOT EXISTS site_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Période de mesure
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Métriques de demandes
  total_requests INTEGER DEFAULT 0,
  pending_requests INTEGER DEFAULT 0,
  completed_requests INTEGER DEFAULT 0,
  cancelled_requests INTEGER DEFAULT 0,
  
  -- Métriques géographiques
  top_cities JSONB, -- {"Orléans": 15, "Montargis": 8, ...}
  
  -- Métriques véhicules
  vehicle_brands JSONB, -- {"Renault": 12, "Peugeot": 10, ...}
  vehicle_conditions JSONB, -- {"accidente": 20, "en_panne": 15, ...}
  
  -- Métriques business
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  average_response_time_hours DECIMAL(5,2),
  customer_satisfaction_avg DECIMAL(3,2),
  
  -- Contraintes
  UNIQUE(period_type, period_start)
);

-- Table pour les paramètres système
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Clé-valeur pour les paramètres
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
  
  -- Métadonnées
  description TEXT,
  category TEXT DEFAULT 'general', -- 'general', 'business', 'technical', 'ui'
  is_public BOOLEAN DEFAULT false, -- Si accessible côté client
  
  -- Audit
  updated_by UUID REFERENCES admin_users(id)
);

-- Indexes pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_intervention_zones_postal_codes ON intervention_zones USING GIN (postal_codes);
CREATE INDEX IF NOT EXISTS idx_pickup_schedules_date ON pickup_schedules(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_pickup_schedules_status ON pickup_schedules(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts(source);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_site_statistics_period ON site_statistics(period_type, period_start);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);

-- Enable Row Level Security sur les nouvelles tables
ALTER TABLE intervention_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Policies RLS pour les nouvelles tables

-- intervention_zones: lecture publique, écriture admin
CREATE POLICY "Anyone can view active intervention zones" ON intervention_zones
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage intervention zones" ON intervention_zones
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- vehicle_types: lecture publique, écriture admin
CREATE POLICY "Anyone can view active vehicle types" ON vehicle_types
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage vehicle types" ON vehicle_types
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- pickup_schedules: admin seulement
CREATE POLICY "Only admins can manage pickup schedules" ON pickup_schedules
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- contacts: insertion publique, lecture/modification admin
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contacts" ON contacts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Only admins can update contacts" ON contacts
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- testimonials: lecture publique des approuvés, gestion admin
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Only admins can manage testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- site_statistics: admin seulement
CREATE POLICY "Only admins can manage statistics" ON site_statistics
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- system_settings: lecture publique pour les paramètres publics, gestion admin
CREATE POLICY "Anyone can view public settings" ON system_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Only admins can manage settings" ON system_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );