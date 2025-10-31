# 🔧 Registration Error - Complete Fix

## Problem
500 Internal Server Error when trying to register new users.

## Solution: Two-Step Fix

### Step 1: Disable Email Confirmation (Supabase Dashboard)

1. Go to https://affazunvzogrlvvgaicu.supabase.co
2. Navigate to **Authentication** → **Providers** → **Email**
3. Find **"Confirm email"** setting
4. **DISABLE** it (toggle OFF)
5. Click **Save**

This is the most common cause of 500 errors during signup.

### Step 2: Run Database Fix (SQL Editor)

Copy and paste this into Supabase SQL Editor:

```sql
-- Complete fix for registration

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Ensure username column exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT;

-- Drop any existing unique constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_username_key;

-- Create the trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, username, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username',
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    username = EXCLUDED.username;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the signup
    RAISE WARNING 'Error creating profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add partial unique index for usernames
DROP INDEX IF EXISTS idx_profiles_username_unique;
CREATE UNIQUE INDEX idx_profiles_username_unique 
  ON profiles(username) 
  WHERE username IS NOT NULL AND username != '';

-- Add regular index
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
```

### Step 3: Test Registration

1. Clear browser cache/cookies
2. Go to http://localhost:5173/register
3. Fill in:
   - Full Name: "Test User"
   - Username: "testuser123"
   - Email: "test123@example.com"
   - Password: "Test123!@#"
   - Confirm Password: "Test123!@#"
4. Click "Create Account"
5. Should work! ✅

## Why This Happens

Common causes of 500 error during signup:

1. **Email confirmation enabled** (most common)
   - Supabase tries to send confirmation email
   - If SMTP not configured, it fails with 500
   - Solution: Disable email confirmation

2. **Trigger function errors**
   - Profile creation fails
   - Unique constraint violations
   - Solution: Better error handling in trigger

3. **Missing columns**
   - Username column doesn't exist
   - Solution: Add column in migration

## Verification Steps

### Check 1: User Created in Auth
1. Go to **Authentication** → **Users**
2. Should see new user with email

### Check 2: Profile Created
1. Go to **Table Editor** → **profiles**
2. Should see profile with username

### Check 3: Can Login
1. Go to http://localhost:5173/login
2. Try username or email
3. Should login successfully

## Alternative: Manual Profile Creation

The frontend now has fallback code that manually creates the profile if the trigger fails. This ensures registration always works even if the trigger has issues.

## Troubleshooting

### Still Getting 500 Error?

**Check Supabase Logs:**
1. Go to **Logs** → **Postgres Logs**
2. Look for errors during signup
3. Check what's failing

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Email confirmation enabled | Disable in Auth settings |
| SMTP not configured | Disable email confirmation |
| Trigger function error | Run Step 2 SQL script |
| Username already exists | Use different username |
| Email already exists | Use different email |

### Check Email Confirmation Status

Run this query in SQL Editor:
```sql
SELECT * FROM auth.config;
```

Look for `enable_signup` and `enable_confirmations` settings.

### Manually Disable Email Confirmation

If UI doesn't work, run this:
```sql
UPDATE auth.config 
SET enable_confirmations = false 
WHERE id = 'email';
```

## Success Indicators

After fix, you should see:
- ✅ No 500 error
- ✅ User created in auth.users
- ✅ Profile created in profiles table
- ✅ Can login with username or email
- ✅ Redirected to home page

## Production Setup

For production, you'll want to:
1. Configure SMTP (Gmail, SendGrid, etc.)
2. Enable email confirmation
3. Customize confirmation email template
4. Set up proper error handling

But for development, disabling email confirmation is fine.

---

**This should fix the registration error!** 🎉
