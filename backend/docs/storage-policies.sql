-- Storage policies for animal_images bucket

-- Allow public to view images
CREATE POLICY "Public can view animal images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'animal_images');

-- Allow anyone (authenticated or anonymous) to upload images
CREATE POLICY "Anyone can upload animal images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'animal_images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'animal_images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'animal_images');
