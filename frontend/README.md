# 🐾 PawRescue Frontend

A modern, responsive web application for reporting and rescuing stray animals in your community.

## 🚀 Features

- **Report Stray Animals**: Submit reports with photos, location, and description
- **Interactive Map**: View all reports on a map with status-based color coding
- **Rescuer Dashboard**: Manage and update rescue statuses
- **Admin Dashboard**: Analytics and user management
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **React.js** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Zustand** for state management (ready to use)
- **Leaflet.js** for maps (ready to integrate)

## 📦 Installation

```bash
npm install
```

## 🏃 Running the App

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Modal.jsx
├── pages/           # Application pages
│   ├── Home.jsx
│   ├── Report.jsx
│   ├── MapView.jsx
│   ├── RescuerDashboard.jsx
│   ├── AdminDashboard.jsx
│   └── About.jsx
├── App.jsx
└── main.jsx
```

## 🎨 Design System

- **Primary Color**: #FF7A00 (Orange)
- **Secondary Color**: #2C6975 (Teal)
- **Background**: #F9FAFB
- **Font**: Poppins

## 🔜 Next Steps

1. Integrate Supabase for backend (authentication, database, storage)
2. Add Leaflet.js map with real coordinates
3. Implement image upload functionality
4. Add authentication flow
5. Connect to real API endpoints

## 📝 License

MIT
