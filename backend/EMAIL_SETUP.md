# 📧 Email OTP Authentication Setup

## Supabase Email Configuration

### Step 1: Enable Email OTP in Supabase

1. Go to [Supabase Dashboard](https://affazunvzogrlvvgaicu.supabase.co)
2. Navigate to **Authentication** > **Providers**
3. Find **Email** provider
4. Enable **Email OTP** toggle
5. Click **Save**

### Step 2: Configure Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. Customize the **Magic Link** template:

```html
<h2>Your Login Code</h2>
<p>Enter this code to sign in to PawRescue:</p>
<h1 style="font-size: 32px; font-weight: bold; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">{{ .Token }}</h1>
<p>This code expires in 60 minutes.</p>
<p>If you didn't request this code, you can safely ignore this email.</p>
```

### Step 3: Email Settings

**Default Configuration (Development):**
- Supabase uses their own SMTP server
- Rate limit: 4 emails per hour per user
- Good for testing

**Production Configuration (Recommended):**

1. Go to **Project Settings** > **Auth**
2. Scroll to **SMTP Settings**
3. Enable **Custom SMTP**
4. Configure with Gmail:

```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: your-email@gmail.com
SMTP Password: your-app-password
Sender Email: your-email@gmail.com
Sender Name: PawRescue
```

### Step 4: Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not enabled)
4. Go to **App passwords**
5. Create new app password:
   - App: Mail
   - Device: Other (Custom name: "PawRescue")
6. Copy the 16-character password
7. Use this password in Supabase SMTP settings

### Step 5: Test Email OTP

1. Go to your app: http://localhost:5173/register
2. Enter email and name
3. Click "Create Account"
4. Check email for OTP code
5. Enter code to verify

## How It Works

### Registration Flow:
1. User enters email and name
2. Supabase sends OTP to email
3. User enters 6-digit code
4. Supabase verifies code
5. User is authenticated
6. Profile is auto-created via trigger

### Login Flow:
1. User enters email
2. Supabase sends OTP to email
3. User enters 6-digit code
4. Supabase verifies code
5. User is authenticated

## Security Features

- ✅ OTP expires in 60 minutes
- ✅ Rate limiting (4 emails/hour in dev)
- ✅ No password storage needed
- ✅ Email verification built-in
- ✅ Secure token generation

## Troubleshooting

### Issue: Email not received
**Solutions:**
- Check spam folder
- Verify email address is correct
- Check Supabase logs: Dashboard > Logs > Auth Logs
- Verify SMTP settings if using custom SMTP

### Issue: "Email rate limit exceeded"
**Solutions:**
- Wait 1 hour before trying again
- Use custom SMTP for higher limits
- Contact Supabase support for rate limit increase

### Issue: Invalid OTP code
**Solutions:**
- Ensure code is entered within 60 minutes
- Check for typos in code
- Request new code

### Issue: User already registered
**Solutions:**
- Use login page instead of register
- Check if email is already in use

## Email Rate Limits

### Development (Supabase SMTP):
- 4 emails per hour per user
- Good for testing

### Production (Custom SMTP):
- Gmail: 500 emails per day
- SendGrid: 100 emails per day (free tier)
- AWS SES: 200 emails per day (free tier)

## Alternative Email Providers

### SendGrid (Recommended for Production)
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Password: your-sendgrid-api-key
```

### AWS SES
```
SMTP Host: email-smtp.us-east-1.amazonaws.com
SMTP Port: 587
SMTP User: your-aws-access-key
SMTP Password: your-aws-secret-key
```

## Testing Checklist

- [ ] Email OTP enabled in Supabase
- [ ] Test registration with new email
- [ ] Verify OTP code received
- [ ] Test login with existing email
- [ ] Verify profile auto-creation
- [ ] Test logout functionality
- [ ] Test invalid OTP code
- [ ] Test expired OTP code

## Production Checklist

- [ ] Configure custom SMTP
- [ ] Customize email templates
- [ ] Set up proper sender domain
- [ ] Configure SPF/DKIM records
- [ ] Test email deliverability
- [ ] Monitor email logs
- [ ] Set up email alerts

---

**Current Status:**
- ✅ Frontend pages created (Login, Register)
- ✅ AuthContext implemented
- ✅ Navbar updated with auth state
- ⬜ Enable Email OTP in Supabase
- ⬜ Test registration flow
- ⬜ Test login flow
