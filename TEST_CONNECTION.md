# 🔍 Test Database Connection

## Quick Test

1. **Go to test page:**
   ```
   http://localhost:5173/test-connection
   ```

2. **Click "Run Connection Tests"**

3. **Check results:**
   - ✅ All green = Database connected properly
   - ❌ Any red = Connection issue

## What It Tests

1. **Supabase Client** - Is the client initialized?
2. **Environment Variables** - Are URL and API key set?
3. **Database Connection** - Can we query the database?
4. **Auth Service** - Can we access authentication?

## If Tests Fail

### ❌ Environment Variables Not Set
**Fix:**
1. Check `frontend/.env` file exists
2. Verify it contains:
   ```
   VITE_SUPABASE_URL=https://affazunvzogrlvvgaicu.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Restart dev server: `npm run dev`

### ❌ Database Connection Failed
**Possible causes:**
1. Wrong URL in .env
2. Wrong API key in .env
3. Supabase project paused/deleted
4. Network/firewall issue
5. RLS policies blocking access

**Fix:**
1. Verify credentials in Supabase Dashboard:
   - Go to **Settings** → **API**
   - Copy **Project URL** and **anon public** key
2. Update `.env` file
3. Restart dev server

### ❌ Auth Service Failed
**Fix:**
1. Check Supabase project is active
2. Verify API key has auth permissions
3. Check Auth is enabled in Supabase

## Current Configuration

Your `.env` file has:
```
VITE_SUPABASE_URL=https://affazunvzogrlvvgaicu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This looks correct! ✅

## If Connection Works But Registration Fails

If the connection test passes but registration still fails with 500 error, the issue is NOT the connection. It's likely:

1. **Email confirmation enabled** (most common)
   - Fix: Disable in Supabase Auth settings

2. **Database trigger error**
   - Fix: Run the SQL fix script

3. **Missing columns**
   - Fix: Run database migration

See `REGISTRATION_FIX_STEPS.md` for detailed fixes.

## Manual Connection Test

You can also test in browser console:

```javascript
// Test database query
const { data, error } = await supabase.from('profiles').select('count')
console.log('Database:', error ? '❌ Failed' : '✅ Connected', data)

// Test auth
const { data: session } = await supabase.auth.getSession()
console.log('Auth:', session ? '✅ Working' : '⚠️ No session')
```

---

**Run the test now:** http://localhost:5173/test-connection
