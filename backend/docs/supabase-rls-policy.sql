-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert reports" ON reports;
DROP POLICY IF EXISTS "Anyone can view reports" ON reports;
DROP POLICY IF EXISTS "Users can update own reports" ON reports;
DROP POLICY IF EXISTS "Authenticated users can update reports" ON reports;
DROP POLICY IF EXISTS "Users can delete own reports" ON reports;

-- Enable RLS on reports table
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert reports (authenticated or anonymous)
CREATE POLICY "Anyone can insert reports"
ON reports
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow users to view all reports
CREATE POLICY "Anyone can view reports"
ON reports
FOR SELECT
TO public
USING (true);

-- Policy: Allow authenticated users to update any report (for rescuers/admins)
CREATE POLICY "Authenticated users can update reports"
ON reports
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow users to delete their own reports
CREATE POLICY "Users can delete own reports"
ON reports
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
