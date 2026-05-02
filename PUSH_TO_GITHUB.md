# 🚀 Push Skill2Hire Platform to GitHub

## Step-by-Step Guide

Follow these exact steps to push your code to GitHub.

---

## ✅ Step 1: Verify .gitignore

Make sure you have a `.gitignore` file in the root folder with these contents:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Database
*.db
*.db-journal
prisma/dev.db
prisma/dev.db-journal

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Misc
.cache/
.temp/
```

---

## 📝 Step 2: Open PowerShell/Terminal

1. Press `Windows + X`
2. Select "Windows PowerShell" or "Terminal"
3. Navigate to your project:

```powershell
cd d:\Sandbox\Skill2HireTech\skill2hire-platform
```

---

## 🔧 Step 3: Initialize Git

Run these commands one by one:

```powershell
# Initialize git repository
git init

# Check status
git status
```

**Expected output:** You should see a list of untracked files.

---

## 📦 Step 4: Add All Files

```powershell
# Add all files to git
git add .

# Verify what was added
git status
```

**Expected output:** Files should now be "staged for commit" (green text).

---

## 💾 Step 5: Create First Commit

```powershell
git commit -m "Initial commit - Skill2Hire platform ready for deployment"
```

**Expected output:** 
```
[main (root-commit) abc1234] Initial commit - Skill2Hire platform ready for deployment
 XXX files changed, XXXX insertions(+)
```

---

## 🌐 Step 6: Create GitHub Repository

### 6.1 Go to GitHub
1. Open browser: https://github.com/new
2. Log in to your GitHub account (or create one if you don't have it)

### 6.2 Create Repository
Fill in these details:

**Repository name:** `skill2hire-platform`

**Description:** `Skill2Hire Technologies - Recruitment and Training Platform`

**Visibility:** 
- ✅ Choose **Private** (recommended) or **Public**

**Important:** 
- ❌ DO NOT check "Add a README file"
- ❌ DO NOT check "Add .gitignore"
- ❌ DO NOT choose a license

### 6.3 Click "Create repository"

---

## 🔗 Step 7: Connect to GitHub

After creating the repository, GitHub will show you commands. 

**Copy your repository URL** (it looks like):
```
https://github.com/YOUR_USERNAME/skill2hire-platform.git
```

**Then run these commands** (replace YOUR_USERNAME with your actual GitHub username):

```powershell
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/skill2hire-platform.git

# Verify remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main
```

---

## 🚀 Step 8: Push to GitHub

```powershell
# Push your code to GitHub
git push -u origin main
```

**You may be asked to log in:**
- Enter your GitHub username
- Enter your Personal Access Token (not password)

**If you don't have a token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Skill2Hire Deployment"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. Copy the token and use it as password

**Expected output:**
```
Enumerating objects: XXX, done.
Counting objects: 100% (XXX/XXX), done.
Writing objects: 100% (XXX/XXX), XX.XX MiB | XX.XX MiB/s, done.
Total XXX (delta X), reused X (delta X)
To https://github.com/YOUR_USERNAME/skill2hire-platform.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ✅ Step 9: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/skill2hire-platform`
2. You should see:
   - ✅ `backend` folder
   - ✅ `frontend` folder
   - ✅ `README.md`
   - ✅ `DEPLOYMENT_GUIDE.md`
   - ✅ All other files

---

## 🎯 Step 10: Deploy on Render

Now that your code is on GitHub:

1. **Go back to Render:** https://render.com
2. **Click:** "New +" → "Web Service"
3. **Click:** "Connect GitHub" (if not already connected)
4. **Authorize Render** to access your GitHub
5. **Select repository:** `skill2hire-platform`
6. **Click:** "Connect"

### Configure Service:
- **Name:** `skill2hire-backend`
- **Region:** Singapore (or closest)
- **Branch:** `main`
- **Root Directory:** `backend` ✅
- **Runtime:** Node
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npm start`
- **Instance Type:** Free

### Add Environment Variables:
```
DATABASE_URL=postgresql://neondb_owner:npg_XN3tcHyZ5SKW@ep-falling-bonus-aoawyjf9.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=sk2h-prod-jwt-secret-2026-XyZ9#mN$pQ@wR*tU&vL!aB^cD%eF(gH)iJ+kM
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://skill2hire-platform.vercel.app
WHATSAPP_NUMBER=+918220333917
```

7. **Click:** "Create Web Service"
8. **Wait:** 5-10 minutes for deployment

---

## 🐛 Troubleshooting

### Error: "git is not recognized"
**Solution:** Install Git from https://git-scm.com/download/win

### Error: "Permission denied"
**Solution:** Use Personal Access Token instead of password

### Error: "Repository not found"
**Solution:** Check your repository URL is correct

### Error: "Authentication failed"
**Solution:** 
1. Generate Personal Access Token on GitHub
2. Use token as password when pushing

---

## 📞 Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the exact error message
3. Check GitHub documentation: https://docs.github.com
4. Check Git documentation: https://git-scm.com/doc

---

## ✅ Success Checklist

- [ ] `.gitignore` file created
- [ ] Git initialized (`git init`)
- [ ] Files added (`git add .`)
- [ ] First commit created
- [ ] GitHub repository created
- [ ] Remote added (`git remote add origin`)
- [ ] Code pushed to GitHub (`git push`)
- [ ] Verified code on GitHub website
- [ ] Ready to deploy on Render

---

**Once you complete all steps, your code will be on GitHub and ready to deploy!** 🎉
