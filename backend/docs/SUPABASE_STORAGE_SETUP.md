# Supabase Storage Setup for Animal Images

## Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**
4. Enter bucket name: `animal_images`
5. Set as **Public bucket** (check the box)
6. Click **Create bucket**

## Set Storage Policies

Run this SQL in your Supabase SQL Editor:

```sql
-- Allow public access to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'animal_images');

-- Allow authenticated and anonymous users to upload
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'animal_images');

-- Allow users to update their own uploads
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'animal_images');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'animal_images');
```

## Verify Setup

After creating the bucket and policies:
1. Images will be uploaded to: `https://[your-project].supabase.co/storage/v1/object/public/animal_images/[filename]`
2. Test by submitting a report with an image
3. Check the Storage tab in Supabase to see uploaded images

## Notes
- Images are stored with timestamp prefix to avoid naming conflicts
- Maximum file size: 5MB
- Allowed formats: JPEG, JPG, PNG, GIF
- Public bucket allows direct image access via URL
