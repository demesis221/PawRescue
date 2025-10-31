-- PawRescue Database Setup Script
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- This script sets up the complete database schema for PawRescue

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('user', 'rescuer', 'admin')) DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. REPORTS TABLE
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  animal_type TEXT NOT NULL CHECK (animal_type IN ('dog', 'cat', 'other')),
  breed TEXT,
  description TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('reported', 'in_progress', 'rescued', 'adopted', 'closed')) DEFAULT 'reported',
  image_urls TEXT[],
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RESCUE ASSIGNMENTS TABLE
CREATE TABLE rescue_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  rescuer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  UNIQUE(report_id, rescuer_id)
);

-- 4. STATUS UPDATES TABLE
CREATE TABLE status_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ADOPTIONS TABLE
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  adopter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  adoption_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'completed')) DEFAULT 'pending'
);

-- INDEXES for better performance
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_location ON reports(latitude, longitude);
CREATE INDEX idx_rescue_assignments_rescuer ON rescue_assignments(rescuer_id);
CREATE INDEX idx_rescue_assignments_report ON rescue_assignments(report_id);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE UNIQUE INDEX idx_profiles_username_unique ON profiles(username) WHERE username IS NOT NULL AND username != '';

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescue_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR PROFILES
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS POLICIES FOR REPORTS
CREATE POLICY "Reports are viewable by everyone" 
  ON reports FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reports" 
  ON reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own reports" 
  ON reports FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Rescuers and admins can update any report" 
  ON reports FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('rescuer', 'admin'))
  );

CREATE POLICY "Users can delete own reports" 
  ON reports FOR DELETE USING (auth.uid() = user_id);

-- RLS POLICIES FOR RESCUE ASSIGNMENTS
CREATE POLICY "Rescuers can view their assignments" 
  ON rescue_assignments FOR SELECT USING (
    auth.uid() = rescuer_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can create assignments" 
  ON rescue_assignments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Rescuers can update their assignments" 
  ON rescue_assignments FOR UPDATE USING (auth.uid() = rescuer_id);

-- RLS POLICIES FOR STATUS UPDATES
CREATE POLICY "Status updates are viewable by everyone" 
  ON status_updates FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create status updates" 
  ON status_updates FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS POLICIES FOR ADOPTIONS
CREATE POLICY "Adoptions are viewable by involved parties" 
  ON adoptions FOR SELECT USING (
    auth.uid() = adopter_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('rescuer', 'admin'))
  );

CREATE POLICY "Users can create adoption requests" 
  ON adoptions FOR INSERT WITH CHECK (auth.uid() = adopter_id);

-- FUNCTION: Update report status with logging
CREATE OR REPLACE FUNCTION update_report_status(
  report_uuid UUID,
  new_status TEXT,
  user_uuid UUID,
  status_comment TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  old_status_value TEXT;
BEGIN
  SELECT status INTO old_status_value FROM reports WHERE id = report_uuid;
  UPDATE reports SET status = new_status, updated_at = NOW() WHERE id = report_uuid;
  INSERT INTO status_updates (report_id, user_id, old_status, new_status, comment)
  VALUES (report_uuid, user_uuid, old_status_value, new_status, status_comment);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FUNCTION: Get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_reports', (SELECT COUNT(*) FROM reports),
    'reported', (SELECT COUNT(*) FROM reports WHERE status = 'reported'),
    'in_progress', (SELECT COUNT(*) FROM reports WHERE status = 'in_progress'),
    'rescued', (SELECT COUNT(*) FROM reports WHERE status = 'rescued'),
    'adopted', (SELECT COUNT(*) FROM reports WHERE status = 'adopted'),
    'closed', (SELECT COUNT(*) FROM reports WHERE status = 'closed'),
    'total_rescuers', (SELECT COUNT(*) FROM profiles WHERE role = 'rescuer'),
    'total_users', (SELECT COUNT(*) FROM profiles WHERE role = 'user'),
    'high_urgency', (SELECT COUNT(*) FROM reports WHERE urgency = 'high' AND status NOT IN ('adopted', 'closed'))
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FUNCTION: Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, username)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER: Create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- FUNCTION: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS: Auto-update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- SETUP COMPLETE!
-- Next steps:
-- 1. Run create_avatars_bucket.sql to set up avatar storage
-- 2. Configure your frontend .env file with Supabase credentials
-- 3. Disable email confirmation in Supabase Dashboard > Authentication > Providers > Email
