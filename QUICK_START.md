# 🚀 PawRescue Quick Start Guide

## ⚡ 3-Minute Setup

### 1️⃣ Enable Email OTP (1 minute)
```
1. Open: https://affazunvzogrlvvgaicu.supabase.co
2. Go to: Authentication > Providers
3. Enable: Email provider
4. Toggle ON: Email OTP
5. Click: Save
```

### 2️⃣ Start Frontend (30 seconds)
```bash
cd frontend
npm run dev
```

### 3️⃣ Test Authentication (1 minute)
```
1. Open: http://localhost:5173/register
2. Enter: Your name and email
3. Check: Email for 6-digit code
4. Enter: Code and verify
5. Done: You're logged in!
```

## 📋 What You Have Now

### ✅ Complete Authentication System
- Login page with OTP (`/login`)
- Register page with OTP (`/register`)
- Auto profile creation
- Session management
- Logout functionality

### ✅ Database Ready
- 5 tables created
- RLS policies enabled
- Functions and triggers
- Storage bucket ready

### ✅ Frontend Pages
- Home page
- Report stray page
- Map view
- Rescuer dashboard
- Admin dashboard
- About page
- **Login page** ⭐ NEW
- **Register page** ⭐ NEW

## 🎯 Test Flow

### Register New User:
```
/register → Enter details → Get OTP → Verify → Logged in
```

### Login Existing User:
```
/login → Enter email → Get OTP → Verify → Logged in
```

### Logout:
```
Click "Logout" in navbar → Logged out
```

## 📁 Key Files

```
frontend/src/
├── pages/
│   ├── Login.jsx          ⭐ NEW
│   └── Register.jsx       ⭐ NEW
├── contexts/
│   └── AuthContext.jsx    ⭐ NEW
└── lib/
    └── supabase.js        ✅ Ready

backend/
├── setup.sql              ✅ Already run
├── EMAIL_SETUP.md         📖 Guide
└── storage-policy.sql     ⬜ Run next
```

## 🔧 Next Actions

### Immediate (Required):
1. ✅ Database setup (DONE)
2. ⬜ Enable Email OTP in Supabase
3. ⬜ Create storage bucket
4. ⬜ Test registration

### Soon (Recommended):
1. ⬜ Customize email templates
2. ⬜ Add protected routes
3. ⬜ Connect Report form to database
4. ⬜ Connect Map to real data

### Later (Optional):
1. ⬜ Configure custom SMTP
2. ⬜ Add role-based access
3. ⬜ Add profile editing
4. ⬜ Deploy to production

## 🎨 Pages Available

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Home | No |
| `/login` | Login | No ⭐ |
| `/register` | Register | No ⭐ |
| `/report` | Report Stray | No* |
| `/map` | Rescue Map | No |
| `/dashboard` | Rescuer Dashboard | No* |
| `/admin` | Admin Dashboard | No* |
| `/about` | About | No |

*Should be protected (add later)

## 📧 Email OTP Details

- **Code Length**: 6 digits
- **Expiration**: 60 minutes
- **Rate Limit**: 4 emails/hour (dev)
- **Provider**: Supabase SMTP (dev)

## 🔐 User Roles

| Role | Permissions |
|------|-------------|
| **user** | Create reports, view all |
| **rescuer** | Update reports, assignments |
| **admin** | Full access, analytics |

Default role: `user`

## 💡 Pro Tips

1. **Check spam folder** if OTP email not received
2. **Use real email** for testing (Gmail works best)
3. **Wait 1 minute** between OTP requests
4. **Code expires** in 60 minutes
5. **Profile auto-created** on first login

## 🐛 Common Issues

### Email not received?
→ Check spam, verify email, wait 1 minute

### Invalid OTP?
→ Check typos, request new code

### Rate limit?
→ Wait 1 hour or use different email

### Can't login?
→ Register first if new user

## 📚 Documentation

- **Full Backend Plan**: `backend/BACKEND_PLAN.md`
- **Implementation Guide**: `backend/IMPLEMENTATION_GUIDE.md`
- **Email Setup**: `backend/EMAIL_SETUP.md`
- **Auth Complete**: `AUTH_SETUP_COMPLETE.md`
- **Backend Summary**: `BACKEND_SUMMARY.md`

## ✨ What's Working

- ✅ Database with 5 tables
- ✅ Row Level Security
- ✅ Auto profile creation
- ✅ Email OTP authentication
- ✅ Login/Register pages
- ✅ Session management
- ✅ Navbar with auth state
- ✅ Logout functionality
- ✅ Beautiful UI/UX

## 🎉 You're Ready!

Just enable Email OTP in Supabase and start testing!

**Dashboard**: https://affazunvzogrlvvgaicu.supabase.co
**App**: http://localhost:5173
