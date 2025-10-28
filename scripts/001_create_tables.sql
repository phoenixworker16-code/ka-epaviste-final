-- Create the removal_requests table for storing vehicle removal requests
CREATE TABLE IF NOT EXISTS removal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Vehicle information
  vehicle_brand TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year INTEGER,
  license_plate TEXT,
  vehicle_condition TEXT NOT NULL CHECK (vehicle_condition IN ('accidente', 'en_panne', 'hors_service', 'autre')),
  
  -- Location information
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  additional_info TEXT,
  
  -- Photos
  photo_urls TEXT[], -- Array of photo URLs
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Admin notes
  admin_notes TEXT,
  estimated_pickup_date DATE,
  actual_pickup_date DATE
);

-- Create admin users table for dashboard access
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS (will be handled at application level)
ALTER TABLE removal_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_removal_requests_status ON removal_requests(status);
CREATE INDEX IF NOT EXISTS idx_removal_requests_created_at ON removal_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_removal_requests_city ON removal_requests(city);
