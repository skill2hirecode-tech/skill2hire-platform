# 🚀 Skill2Hire Platform - Deployment Guide

## 📋 Complete Step-by-Step Deployment Instructions

This guide will help you deploy your Skill2Hire platform to the internet using free/affordable hosting services.

---

## 🎯 Deployment Architecture

```
Frontend (Vercel) → Backend (Render/Railway) → Database (Neon/Supabase)
```

---

## 📦 What We'll Deploy

1. **Frontend** → Vercel (Free)
2. **Backend** → Render or Railway (Free tier available)
3. **Database** → Neon PostgreSQL or Supabase (Free tier)
4. **Files** → Cloudinary (Free tier)

---

## 🔧 Pre-Deployment Checklist

### ✅ Before You Start

- [ ] GitHub account created
- [ ] Code pushed to GitHub repository
- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database schema finalized

---

## 📝 Step 1: Prepare Your Code for Deployment

### 1.1 Create GitHub Repository

```bash
# Initialize git (if not already done)
cd d:\Sandbox\Skill2HireTech\skill2hire-platform
git init

# Create .gitignore (already exists)
# Make sure it includes:
# node_modules/
# .env
# .env.local
# .next/
# dist/
# *.db

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create repository on GitHub
# Go to https://github.com/new
# Repository name: skill2hire-platform
# Make it Private or Public (your choice)

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/skill2hire-platform.git
git branch -M main
git push -u origin main
```

### 1.2 Update Database Configuration

**File:** `backend/prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

---

## 🗄️ Step 2: Deploy Database (Choose One)

### Option A: Neon PostgreSQL (Recommended - Free)

#### 2.1 Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub
3. Click "Create Project"

#### 2.2 Configure Database
- **Project Name:** skill2hire-db
- **Region:** Choose closest to your users
- **PostgreSQL Version:** 15 or latest
- Click "Create Project"

#### 2.3 Get Connection String
1. After creation, click "Connection Details"
2. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
3. Save this - you'll need it later!

### Option B: Supabase (Alternative - Free)

#### 2.1 Create Supabase Account
1. Go to https://supabase.com
2. Sign up with GitHub
3. Click "New Project"

#### 2.2 Configure Database
- **Organization:** Create new or select existing
- **Project Name:** skill2hire
- **Database Password:** Create strong password
- **Region:** Choose closest to your users
- Click "Create Project" (takes 2-3 minutes)

#### 2.3 Get Connection String
1. Go to Project Settings → Database
2. Copy "Connection string" under "Connection pooling"
3. Replace `[YOUR-PASSWORD]` with your actual password
4. Save this connection string!

---

## 🖥️ Step 3: Deploy Backend

### Option A: Render (Recommended - Free)

#### 3.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"

#### 3.2 Connect Repository
1. Click "Connect GitHub"
2. Select your repository: `skill2hire-platform`
3. Click "Connect"

#### 3.3 Configure Web Service
Fill in the following:

**Basic Settings:**
- **Name:** `skill2hire-backend`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npm start`

**Instance Type:**
- Select "Free" (or paid if you prefer)

#### 3.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables:

```env
DATABASE_URL=postgresql://your-neon-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app

# Email (Optional - configure later)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# WhatsApp
WHATSAPP_NUMBER=+918220333917
```

#### 3.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL (e.g., `https://skill2hire-backend.onrender.com`)

#### 3.6 Run Database Migration
1. Go to your service dashboard
2. Click "Shell" tab
3. Run:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Option B: Railway (Alternative)

#### 3.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"

#### 3.2 Select Repository
1. Select `skill2hire-platform`
2. Click "Deploy Now"

#### 3.3 Configure Service
1. Click on the deployed service
2. Go to "Settings"
3. Set **Root Directory:** `backend`
4. Set **Build Command:** `npm install && npx prisma generate && npm run build`
5. Set **Start Command:** `npm start`

#### 3.4 Add Environment Variables
1. Go to "Variables" tab
2. Add all environment variables (same as Render above)

#### 3.5 Generate Domain
1. Go to "Settings" → "Networking"
2. Click "Generate Domain"
3. Copy your backend URL

---

## 🌐 Step 4: Deploy Frontend (Vercel)

### 4.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"

### 4.2 Import Repository
1. Click "Import Git Repository"
2. Select `skill2hire-platform`
3. Click "Import"

### 4.3 Configure Project
**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `frontend`

**Build Settings:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### 4.4 Add Environment Variables
Click "Environment Variables" and add:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=+918220333917
```

**Note:** Replace `your-backend-url.onrender.com` with your actual backend URL from Step 3

### 4.5 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://skill2hire-platform.vercel.app`

### 4.6 Update Backend CORS
1. Go back to your backend (Render/Railway)
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy backend

---

## 🔄 Step 5: Update Backend CORS Settings

### 5.1 Update CORS Configuration
**File:** `backend/src/server.ts`

Make sure CORS is configured to accept your frontend URL:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 5.2 Commit and Push
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Backend will auto-redeploy on Render/Railway.

---

## 📧 Step 6: Configure Email Service (Optional)

### Option A: Gmail (Simple)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account → Security
   - Click "2-Step Verification"
   - Scroll to "App passwords"
   - Generate password for "Mail"
3. **Update Environment Variables:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-digit-app-password
   ```

### Option B: SendGrid (Professional)

1. Go to https://sendgrid.com
2. Sign up for free (100 emails/day)
3. Create API Key
4. Update environment variables:
   ```env
   SENDGRID_API_KEY=your-api-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

---

## 📁 Step 7: Configure File Upload (Optional)

### Cloudinary Setup (Free - 25GB storage)

#### 7.1 Create Account
1. Go to https://cloudinary.com
2. Sign up for free
3. Go to Dashboard

#### 7.2 Get Credentials
Copy these from your dashboard:
- Cloud Name
- API Key
- API Secret

#### 7.3 Update Environment Variables
Add to backend:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 7.4 Update Upload Middleware
**File:** `backend/src/middleware/upload.middleware.ts`

Configure Cloudinary instead of local storage.

---

## 🔒 Step 8: Security Checklist

### 8.1 Environment Variables
- [ ] All sensitive data in environment variables
- [ ] No `.env` files committed to Git
- [ ] Strong JWT secret (min 32 characters)
- [ ] Database password is strong

### 8.2 CORS Configuration
- [ ] CORS only allows your frontend domain
- [ ] No `origin: '*'` in production

### 8.3 Rate Limiting
- [ ] API rate limiting enabled
- [ ] Login attempt limiting configured

### 8.4 HTTPS
- [ ] Both frontend and backend use HTTPS (automatic on Vercel/Render)

---

## 🎯 Step 9: Custom Domain (Optional)

### 9.1 Buy Domain
- Namecheap, GoDaddy, or Google Domains
- Example: `skill2hiretechnologies.com`

### 9.2 Configure Frontend Domain (Vercel)
1. Go to Vercel project → Settings → Domains
2. Add your domain: `skill2hiretechnologies.com`
3. Follow DNS configuration instructions
4. Add DNS records at your domain registrar

### 9.3 Configure Backend Domain (Render)
1. Go to Render service → Settings
2. Add custom domain: `api.skill2hiretechnologies.com`
3. Add CNAME record at your domain registrar

---

## 🧪 Step 10: Test Your Deployment

### 10.1 Frontend Tests
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Styles loading properly
- [ ] Images displaying
- [ ] Forms working

### 10.2 Backend Tests
- [ ] API health check: `https://your-backend.onrender.com/health`
- [ ] Jobs API: `https://your-backend.onrender.com/api/jobs`
- [ ] Courses API: `https://your-backend.onrender.com/api/courses`

### 10.3 Integration Tests
- [ ] Job application submission works
- [ ] Course enrollment works
- [ ] Contact form works
- [ ] WhatsApp button works
- [ ] Email notifications sent (if configured)

---

## 📊 Step 11: Monitoring & Maintenance

### 11.1 Set Up Monitoring
- **Vercel:** Built-in analytics (free)
- **Render:** Built-in metrics
- **Uptime Monitoring:** UptimeRobot (free)

### 11.2 Regular Maintenance
- Monitor error logs weekly
- Update dependencies monthly
- Backup database weekly
- Review security updates

---

## 🐛 Troubleshooting

### Common Issues

#### Frontend Not Loading
```bash
# Check build logs in Vercel
# Verify environment variables
# Check browser console for errors
```

#### Backend API Errors
```bash
# Check Render/Railway logs
# Verify DATABASE_URL is correct
# Test database connection
# Check CORS settings
```

#### Database Connection Failed
```bash
# Verify connection string
# Check if database is active
# Ensure IP whitelist includes 0.0.0.0/0 (for serverless)
```

#### CORS Errors
```bash
# Update FRONTEND_URL in backend
# Redeploy backend
# Clear browser cache
```

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | Free | 100GB bandwidth/month |
| **Render** | Free | 750 hours/month |
| **Neon** | Free | 3GB storage, 1 project |
| **Cloudinary** | Free | 25GB storage, 25GB bandwidth |
| **SendGrid** | Free | 100 emails/day |

**Total Monthly Cost:** $0 (on free tiers)

---

## 🚀 Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Database created (Neon/Supabase)
- [ ] Backend deployed (Render/Railway)
- [ ] Database migrated and seeded
- [ ] Frontend deployed (Vercel)
- [ ] Environment variables configured
- [ ] CORS updated
- [ ] All features tested
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

## 🎉 Congratulations!

Your Skill2Hire platform is now live on the internet! 🌐

**Share your website:**
- Frontend: `https://your-site.vercel.app`
- Backend API: `https://your-backend.onrender.com`

---

**Last Updated:** May 2, 2026  
**Version:** 1.0.0  
**Deployment Time:** ~30-45 minutes (first time)
