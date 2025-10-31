# 🐾 PawRescue Backend Implementation Plan

## 📋 Overview
Backend architecture using **Supabase** as the primary database and backend service.

**Project Details:**
- Project Name: PawRescue200221
- Project URL: https://affazunvzogrlvvgaicu.supabase.co
- Database: PostgreSQL (via Supabase)
- Storage: Supabase Storage
- Auth: Supabase Auth

---

## 🗄️ Database Schema

### 1. **users** (Extended from Supabase Auth)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('user', 'rescuer', 'admin')) DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. **reports**
```sql
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
```

### 3. **rescue_assignments**
```sql
CREATE TABLE rescue_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  rescuer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  UNIQUE(report_id, rescuer_id)
);
```

### 4. **status_updates**
```sql
CREATE TABLE status_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. **adoptions**
```sql
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  adopter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  adoption_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'completed')) DEFAULT 'pending'
);
```

---

## 🔐 Row Level Security (RLS) Policies

### profiles
```sql
-- Users can view all profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### reports
```sql
-- Anyone can view reports
CREATE POLICY "Reports are viewable by everyone" ON reports FOR SELECT USING (true);

-- Authenticated users can create reports
CREATE POLICY "Authenticated users can create reports" ON reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own reports
CREATE POLICY "Users can update own reports" ON reports FOR UPDATE USING (auth.uid() = user_id);

-- Rescuers and admins can update any report
CREATE POLICY "Rescuers can update reports" ON reports FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('rescuer', 'admin'))
);
```

### rescue_assignments
```sql
-- Rescuers and admins can view assignments
CREATE POLICY "Rescuers can view assignments" ON rescue_assignments FOR SELECT USING (
  auth.uid() = rescuer_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Admins can create assignments
CREATE POLICY "Admins can create assignments" ON rescue_assignments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

---

## 📁 Storage Buckets

### animal_images
```javascript
// Public bucket for animal photos
// Max file size: 5MB
// Allowed types: image/jpeg, image/png, image/webp
```

**Storage Policies:**
```sql
-- Anyone can view images
CREATE POLICY "Images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'animal_images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'animal_images' AND auth.role() = 'authenticated'
);
```

---

## 🔧 Database Functions

### 1. Update Report Status
```sql
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
  -- Get current status
  SELECT status INTO old_status_value FROM reports WHERE id = report_uuid;
  
  -- Update report
  UPDATE reports SET status = new_status, updated_at = NOW() WHERE id = report_uuid;
  
  -- Log status change
  INSERT INTO status_updates (report_id, user_id, old_status, new_status, comment)
  VALUES (report_uuid, user_uuid, old_status_value, new_status, status_comment);
END;
$$ LANGUAGE plpgsql;
```

### 2. Get Dashboard Statistics
```sql
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
    'total_rescuers', (SELECT COUNT(*) FROM profiles WHERE role = 'rescuer'),
    'total_users', (SELECT COUNT(*) FROM profiles)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
```

---

## 🚀 API Endpoints (via Supabase Client)

### Authentication
- `supabase.auth.signUp()` - Register new user
- `supabase.auth.signInWithPassword()` - Login
- `supabase.auth.signOut()` - Logout
- `supabase.auth.resetPasswordForEmail()` - Password reset

### Reports
- `GET /reports` - List all reports with filters
- `POST /reports` - Create new report
- `GET /reports/:id` - Get single report
- `PATCH /reports/:id` - Update report
- `DELETE /reports/:id` - Delete report

### Rescuer Operations
- `POST /rescue_assignments` - Assign rescuer to report
- `GET /rescue_assignments/my` - Get my assignments
- `PATCH /rescue_assignments/:id` - Update assignment

### Admin Operations
- `GET /dashboard/stats` - Get statistics
- `GET /users` - List all users
- `PATCH /users/:id/role` - Update user role

---

## 📦 Implementation Steps

### Phase 1: Database Setup
1. ✅ Create all tables in Supabase SQL Editor
2. ✅ Enable RLS on all tables
3. ✅ Create RLS policies
4. ✅ Create storage bucket for images
5. ✅ Create database functions

### Phase 2: Frontend Integration
1. Install Supabase client in frontend
2. Create Supabase service file
3. Implement authentication flow
4. Connect report submission to database
5. Implement real-time subscriptions

### Phase 3: Features
1. Image upload to Supabase Storage
2. Real-time map updates
3. Rescuer dashboard with assignments
4. Admin dashboard with analytics
5. Email notifications (via Supabase Edge Functions)

---

## 🔌 Frontend Integration Example

### Setup Supabase Client
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://affazunvzogrlvvgaicu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Create Report
```javascript
const { data, error } = await supabase
  .from('reports')
  .insert({
    animal_type: 'dog',
    breed: 'Mixed',
    description: 'Injured dog',
    location_name: 'Lahug, Cebu',
    latitude: 10.3157,
    longitude: 123.8854,
    urgency: 'high'
  })
```

### Upload Image
```javascript
const { data, error } = await supabase.storage
  .from('animal_images')
  .upload(`${reportId}/${file.name}`, file)
```

### Real-time Subscription
```javascript
supabase
  .channel('reports')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'reports' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()
```

---

## 🛡️ Security Considerations

1. **API Keys**: Store in environment variables
2. **RLS**: All tables have RLS enabled
3. **File Upload**: Validate file types and sizes
4. **Input Validation**: Sanitize all user inputs
5. **Rate Limiting**: Use Supabase built-in rate limiting

---

## 📊 Monitoring & Analytics

- Use Supabase Dashboard for:
  - Database queries monitoring
  - Storage usage
  - API usage
  - Authentication logs
  - Real-time connections

---

## 🔄 Next Steps

1. Run SQL scripts in Supabase SQL Editor
2. Update frontend `.env` with Supabase credentials
3. Implement authentication UI
4. Connect forms to database
5. Test RLS policies
6. Deploy frontend to Vercel/Netlify
