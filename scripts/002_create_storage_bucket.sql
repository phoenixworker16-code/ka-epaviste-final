-- Create storage bucket for vehicle photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-photos', 'vehicle-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for vehicle photos
CREATE POLICY "Anyone can upload vehicle photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vehicle-photos');

CREATE POLICY "Anyone can view vehicle photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'vehicle-photos');

-- Allow public access to vehicle photos
CREATE POLICY "Public can view vehicle photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'vehicle-photos');
