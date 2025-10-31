# 🐾 PawRescue Backend API

Express.js backend server for PawRescue application with Supabase integration.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_service_role_key
PORT=5000
```

### 3. Setup Database
1. Run `setup.sql` in Supabase SQL Editor
2. Run `create_avatars_bucket.sql` in Supabase SQL Editor
3. Create `animal_images` bucket in Supabase Storage (make it public)

### 4. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server runs on: `http://localhost:5000`

## 📡 API Endpoints

### Reports
- `POST /api/reports` - Create new report (with image upload)
- `GET /api/reports` - Get all reports
- `PATCH /api/reports/:id/status` - Update report status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 📁 Files
- `server.js` - Express API server
- `setup.sql` - Database schema
- `create_avatars_bucket.sql` - Avatar storage setup
- `package.json` - Dependencies
- `.env.example` - Environment template

## 🧪 Testing
1. Start backend: `npm start`
2. Start frontend: `cd ../frontend && npm run dev`
3. Submit a report from frontend
4. Check map page to see report displayed

## 🔧 Troubleshooting
- **Connection error**: Ensure server is running on port 5000
- **Image upload fails**: Verify `animal_images` bucket exists and is public
- **CORS error**: Backend has CORS enabled for all origins
- **Database error**: Check Supabase credentials in `.env`
