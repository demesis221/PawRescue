# PawRescue Backend API

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Start server
npm start
```

Server runs on: `http://localhost:5000`

## Project Structure

```
backend/
├── config/              # Configuration files
├── controllers/         # Business logic
│   └── reportController.js
├── routes/             # API routes
│   └── reports.js
├── docs/               # Documentation & SQL files
├── uploads/            # Temporary file storage (deprecated)
├── server.js           # Main server file
├── package.json        # Dependencies
└── .env               # Environment variables
```

## API Endpoints

### Reports
- `POST /api/reports` - Create new report
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get single report
- `PATCH /api/reports/:id/status` - Update report status

## Documentation

See `/docs` folder for:
- Database setup SQL
- Supabase storage configuration
- RLS policies
- Implementation guides

## Environment Variables

```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```
