# 🐾 PawRescue Backend Setup

Complete database setup for PawRescue using Supabase (PostgreSQL).

## 🚀 Quick Start for New Users

### 1. Create Supabase Project
- Go to https://supabase.com/dashboard
- Click "New Project"
- Save your **Project URL** and **anon key**

### 2. Run Database Setup (IN ORDER)
1. Open Supabase SQL Editor: `Project > SQL Editor > New Query`
2. **First**: Copy and run `setup.sql` (creates all tables, policies, functions)
3. **Second**: Copy and run `create_avatars_bucket.sql` (sets up avatar storage)

### 3. Configure Authentication
- Go to `Authentication > Providers > Email`
- **Disable** "Confirm email" (for development)
- Save changes

### 4. Update Frontend Config
Create `frontend/.env`:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 📊 Database Schema

### Tables
- **profiles** - User profiles (username, avatar, role)
- **reports** - Stray animal reports with location
- **rescue_assignments** - Rescuer task assignments
- **status_updates** - Report status change history
- **adoptions** - Animal adoption records

### Storage Buckets
- **avatars** - User profile photos (`avatars/{user_id}/`)

## ✨ Features
- ✅ Row Level Security (RLS) on all tables
- ✅ Auto profile creation on user signup
- ✅ Username + email login support
- ✅ Avatar upload with auto-delete old photos
- ✅ Dashboard statistics function
- ✅ Real-time subscriptions ready

## 🔐 User Roles
- **user** (default) - Create reports, view all reports
- **rescuer** - Update reports, manage assignments
- **admin** - Full access, user management

## 📁 Files Guide
- `setup.sql` - **Main database schema** (RUN FIRST)
- `create_avatars_bucket.sql` - **Avatar storage setup** (RUN SECOND)
- `BACKEND_PLAN.md` - Architecture documentation
- `IMPLEMENTATION_GUIDE.md` - Detailed implementation guide
- Other `.sql` files - Deprecated/temporary fixes (can be ignored)

## 🧪 Testing the Setup
1. Run both SQL files in order
2. Start frontend: `cd frontend && npm run dev`
3. Register a new account
4. Check Supabase Dashboard > Table Editor > profiles (should see new profile)
5. Upload avatar on profile page
6. Check Storage > avatars (should see uploaded image)

## 🆘 Troubleshooting
- **500 error on registration**: Make sure email confirmation is disabled
- **Profile not created**: Check if trigger exists in Database > Functions
- **Avatar upload fails**: Verify avatars bucket exists and is public
- **Can't login with username**: Check username index exists in profiles table
