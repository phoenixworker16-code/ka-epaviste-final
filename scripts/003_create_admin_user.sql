-- Create a default admin user
-- Note: This is for development purposes. In production, you should create admin users through a secure process.

-- First, we need to insert a user into auth.users (this would normally be done through Supabase Auth)
-- For now, we'll create a trigger to automatically create an admin profile when a user signs up with a specific email

-- Create a function to handle admin user creation
CREATE OR REPLACE FUNCTION handle_admin_user_creation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the email is an admin email (you can customize this logic)
  IF NEW.email = 'admin@ka-auto-epaves.fr' OR NEW.email LIKE '%@ka-auto-epaves.fr' THEN
    INSERT INTO public.admin_users (id, email, first_name, last_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'Admin'),
      COALESCE(NEW.raw_user_meta_data ->> 'last_name', 'User'),
      'admin'
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create admin profiles
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_admin_user_creation();

-- Insert a sample admin user (for development)
-- In production, you would create this through the Supabase Auth interface
INSERT INTO public.admin_users (id, email, first_name, last_name, role)
VALUES (
  gen_random_uuid(),
  'admin@ka-auto-epaves.fr',
  'Admin',
  'KA Auto',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;
