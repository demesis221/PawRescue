# 🎯 PawRescue Backend Implementation Guide

## Step-by-Step Setup

### Phase 1: Database Setup (15 minutes)

#### 1.1 Run Main Setup Script
1. Open [Supabase SQL Editor](https://affazunvzogrlvvgaicu.supabase.co/project/affazunvzogrlvvgaicu/sql)
2. Create new query
3. Copy entire content from `setup.sql`
4. Click **RUN**
5. Verify: Check **Table Editor** - should see 5 tables

#### 1.2 Create Storage Bucket
1. Go to **Storage** section
2. Click **New bucket**
3. Name: `animal_images`
4. Public bucket: **YES**
5. Click **Create bucket**

#### 1.3 Apply Storage Policies
1. Open SQL Editor again
2. Copy content from `storage-policy.sql`
3. Click **RUN**

### Phase 2: Frontend Integration (10 minutes)

#### 2.1 Update Environment Variables
File already created: `frontend/.env`
```env
VITE_SUPABASE_URL=https://affazunvzogrlvvgaicu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 2.2 Verify Supabase Client
File already created: `frontend/src/lib/supabase.js`

#### 2.3 Test Connection
```bash
cd frontend
npm run dev
```

Open browser console and test:
```javascript
import { supabase } from './lib/supabase'
const { data } = await supabase.from('reports').select('*')
console.log(data)
```

### Phase 3: Connect Components (30 minutes)

#### 3.1 Update Report.jsx
Replace mock data with real Supabase calls:

```javascript
import { reports, storage, auth } from '../lib/supabase'

const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Get current user
  const user = await auth.getUser()
  
  // Create report
  const { data: report, error } = await reports.create({
    user_id: user.id,
    animal_type: formData.animalType,
    breed: formData.breed,
    description: formData.description,
    location_name: formData.location,
    latitude: formData.latitude,
    longitude: formData.longitude,
    urgency: formData.urgency,
    contact_phone: formData.phone
  })
  
  // Upload images
  if (formData.images.length > 0) {
    const imageUrls = []
    for (const file of formData.images) {
      const { data: url } = await storage.uploadImage(file, report.id)
      imageUrls.push(url)
    }
    
    // Update report with image URLs
    await reports.update(report.id, { image_urls: imageUrls })
  }
}
```

#### 3.2 Update MapView.jsx
Replace mockReports with real data:

```javascript
import { reports, subscriptions } from '../lib/supabase'
import { useEffect, useState } from 'react'

const [reportsList, setReportsList] = useState([])

useEffect(() => {
  // Load initial data
  const loadReports = async () => {
    const { data } = await reports.getAll()
    setReportsList(data)
  }
  loadReports()
  
  // Subscribe to real-time updates
  const channel = subscriptions.subscribeToReports((payload) => {
    loadReports() // Reload on any change
  })
  
  return () => subscriptions.unsubscribe(channel)
}, [])
```

#### 3.3 Update RescuerDashboard.jsx
```javascript
import { reports } from '../lib/supabase'

const handleStatusUpdate = async (reportId, newStatus) => {
  await reports.updateStatus(reportId, newStatus, 'Status updated by rescuer')
  // Reload data
}
```

#### 3.4 Update AdminDashboard.jsx
```javascript
import { dashboard } from '../lib/supabase'

useEffect(() => {
  const loadStats = async () => {
    const { data } = await dashboard.getStats()
    setStats(data)
  }
  loadStats()
}, [])
```

### Phase 4: Authentication (20 minutes)

#### 4.1 Create Auth Context
Create `frontend/src/contexts/AuthContext.jsx`:

```javascript
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.getSession().then(session => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

#### 4.2 Wrap App with AuthProvider
Update `frontend/src/main.jsx`:

```javascript
import { AuthProvider } from './contexts/AuthContext'

<AuthProvider>
  <App />
</AuthProvider>
```

#### 4.3 Create Login/Signup Pages
Add authentication UI components as needed.

### Phase 5: Testing (15 minutes)

#### 5.1 Create Test User
1. Go to Supabase Dashboard > Authentication
2. Click **Add User**
3. Email: test@pawrescue.com
4. Password: Test123!
5. Click **Create User**

#### 5.2 Test Report Creation
1. Login with test user
2. Go to Report page
3. Fill form and submit
4. Check Supabase Table Editor > reports

#### 5.3 Test Image Upload
1. Add image to report
2. Check Storage > animal_images bucket

#### 5.4 Test Real-time Updates
1. Open app in two browser windows
2. Create report in one window
3. Verify it appears in other window

### Phase 6: Deploy (10 minutes)

#### 6.1 Update .gitignore
Ensure `.env` is ignored (already done)

#### 6.2 Deploy to Vercel
```bash
cd frontend
vercel
```

Add environment variables in Vercel dashboard:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## 🎉 Done!

Your PawRescue backend is now fully operational with:
- ✅ PostgreSQL database
- ✅ Authentication system
- ✅ File storage
- ✅ Real-time updates
- ✅ Row-level security
- ✅ API endpoints

## 🐛 Troubleshooting

### Issue: "relation does not exist"
- Solution: Run `setup.sql` again

### Issue: "permission denied for table"
- Solution: Check RLS policies are created

### Issue: "storage bucket not found"
- Solution: Create `animal_images` bucket

### Issue: Images not uploading
- Solution: Run `storage-policy.sql`

### Issue: Real-time not working
- Solution: Check Supabase Realtime is enabled in project settings

## 📞 Support

Check Supabase logs:
- Dashboard > Logs > Postgres Logs
- Dashboard > Logs > API Logs
