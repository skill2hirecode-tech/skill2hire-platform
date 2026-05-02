# 📧 Email Setup Guide for Skill2Hire Platform

## 🎯 Overview

Your platform sends emails for:
1. **Course Enrollments** → Admin gets notified
2. **Job Applications** → Admin gets notified  
3. **Contact Form** → Admin gets notified
4. **Welcome Emails** → Student/Applicant receives confirmation

**Admin Email:** skill2hirecode@gmail.com

---

## ⚙️ Gmail SMTP Setup (Required)

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable it

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: **Skill2Hire Platform**
5. Click **Generate**
6. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

### Step 3: Update .env File

Open `backend/.env` and update this line:

```env
SMTP_PASS="your-16-character-app-password-here"
```

Replace `your-gmail-app-password-here` with the App Password you just generated.

**Example:**
```env
SMTP_PASS="abcd efgh ijkl mnop"
```

### Step 4: Restart Backend Server

```bash
cd backend
# Stop the server (Ctrl+C)
npm run dev
```

---

## 📧 Email Configuration (backend/.env)

```env
# Email Configuration
ADMIN_EMAIL="skill2hirecode@gmail.com"
FROM_EMAIL="skill2hirecode@gmail.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="skill2hirecode@gmail.com"
SMTP_PASS="your-gmail-app-password-here"  # ← UPDATE THIS!
```

---

## 🧪 Test Email Sending

### Test 1: Enroll in a Course

1. Visit: http://localhost:3002/courses/servicenow
2. Fill enrollment form
3. Submit
4. Check `skill2hirecode@gmail.com` inbox for notification

### Test 2: Check Backend Logs

When you submit an enrollment, you should see:
```
Email sent to skill2hirecode@gmail.com via SMTP
```

If you see an error, it means:
- App Password is incorrect
- 2FA is not enabled
- Gmail is blocking the connection

---

## 🔍 Troubleshooting

### Error: "Invalid login credentials"

**Solution:**
- Make sure you're using the **App Password**, not your regular Gmail password
- The App Password should be 16 characters (with or without spaces)
- Make sure 2-Factor Authentication is enabled

### Error: "Connection timeout"

**Solution:**
- Check your internet connection
- Make sure port 587 is not blocked by firewall
- Try using port 465 with `secure: true`

### Error: "Email sending failed"

**Current Behavior:**
- The enrollment still succeeds (saves to database)
- Email error is logged but doesn't stop the process
- This is by design - enrollment works even if email fails

**To see the exact error:**
1. Check backend terminal logs
2. Look for "Email sending failed:" message
3. The error details will be shown

---

## 📨 Email Templates

### 1. Course Enrollment (to Admin)

**To:** skill2hirecode@gmail.com  
**Subject:** New Course Enrollment - [Course Name] - [Student Name]

**Contains:**
- Student name, email, phone
- Course title
- Enrollment date
- Student's message

### 2. Welcome Email (to Student)

**To:** [Student Email]  
**Subject:** Welcome to Skill2Hire Technologies!

**Contains:**
- Welcome message
- What to expect next
- Contact information

---

## 🚀 Production Setup (Optional)

For production, you can use:

### Option 1: SendGrid (Recommended)

1. Sign up at: https://sendgrid.com/
2. Get API Key
3. Add to `.env`:
```env
SENDGRID_API_KEY="your-sendgrid-api-key"
```

### Option 2: AWS SES

1. Set up AWS SES
2. Configure SMTP credentials
3. Update `.env` with SES SMTP settings

---

## 📊 Current Email Flow

```
Student Enrolls in Course
         ↓
Backend receives request
         ↓
Saves to database ✅
         ↓
Tries to send emails:
  1. Admin notification → skill2hirecode@gmail.com
  2. Welcome email → Student's email
         ↓
If email fails:
  - Logs error
  - Enrollment still succeeds
  - Returns success to frontend
```

---

## ✅ Quick Checklist

- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate App Password
- [ ] Update `SMTP_PASS` in `backend/.env`
- [ ] Restart backend server
- [ ] Test enrollment
- [ ] Check Gmail inbox for notification

---

## 🔐 Security Notes

1. **Never commit `.env` file** to Git (already in .gitignore)
2. **App Password is different** from your Gmail password
3. **Keep App Password secret** - treat it like a password
4. **Revoke App Password** if compromised at: https://myaccount.google.com/apppasswords

---

## 📞 Support

If emails are not working:
1. Check backend terminal for error messages
2. Verify App Password is correct
3. Make sure 2FA is enabled on Gmail
4. Check spam folder in Gmail

**The enrollment will still work even if emails fail!**

---

**Last Updated:** 2026-05-01  
**Admin Email:** skill2hirecode@gmail.com
