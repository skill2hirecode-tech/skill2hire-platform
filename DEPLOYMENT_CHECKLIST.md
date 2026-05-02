# ✅ Deployment Checklist - Skill2Hire Platform

## 🎯 Quick Reference Checklist

Use this checklist to ensure smooth deployment of your Skill2Hire platform.

---

## 📋 Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] All API endpoints working
- [ ] Database seeded with sample data
- [ ] Environment variables documented
- [ ] `.gitignore` configured properly
- [ ] Code committed to Git

### GitHub Setup
- [ ] GitHub account created
- [ ] Repository created (public/private)
- [ ] Code pushed to GitHub
- [ ] Repository URL noted

---

## 🗄️ Database Deployment

### Neon PostgreSQL (Recommended)
- [ ] Account created at https://neon.tech
- [ ] Project created
- [ ] Connection string copied
- [ ] Connection string saved securely

**Connection String Format:**
```
postgresql://user:pass@host.neon.tech/dbname?sslmode=require
```

### Update Schema
- [ ] Changed `provider` from `sqlite` to `postgresql` in `schema.prisma`
- [ ] Committed changes to Git

---

## 🖥️ Backend Deployment (Render)

### Account & Service Setup
- [ ] Render account created at https://render.com
- [ ] GitHub connected
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Root directory set to `backend`

### Build Configuration
- [ ] Build Command: `npm install && npx prisma generate && npm run build`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free (or paid)

### Environment Variables
- [ ] `DATABASE_URL` = (Neon connection string)
- [ ] `JWT_SECRET` = (min 32 characters)
- [ ] `JWT_EXPIRES_IN` = `7d`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `FRONTEND_URL` = (will add after frontend deployment)
- [ ] `WHATSAPP_NUMBER` = `+918220333917`

### Post-Deployment
- [ ] Service deployed successfully
- [ ] Backend URL copied (e.g., `https://skill2hire-backend.onrender.com`)
- [ ] Database migration run via Shell: `npx prisma migrate deploy`
- [ ] Database seeded via Shell: `npx prisma db seed`
- [ ] Health check tested: `https://your-backend.onrender.com/health`

---

## 🌐 Frontend Deployment (Vercel)

### Account & Project Setup
- [ ] Vercel account created at https://vercel.com
- [ ] GitHub connected
- [ ] New Project created
- [ ] Repository imported
- [ ] Root directory set to `frontend`

### Build Configuration
- [ ] Framework: Next.js (auto-detected)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api`
- [ ] `NEXT_PUBLIC_SITE_URL` = (will update after deployment)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` = `+918220333917`

### Post-Deployment
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., `https://skill2hire.vercel.app`)
- [ ] `NEXT_PUBLIC_SITE_URL` updated with actual URL
- [ ] Redeployed to apply changes

---

## 🔄 Backend Update

### Update CORS
- [ ] Go back to Render backend
- [ ] Update `FRONTEND_URL` with Vercel URL
- [ ] Service redeployed automatically
- [ ] CORS working (no errors in browser console)

---

## 🧪 Testing

### Frontend Tests
- [ ] Homepage loads with styles
- [ ] Jobs page loads
- [ ] Courses page loads
- [ ] Contact page loads
- [ ] About page loads
- [ ] All images loading
- [ ] WhatsApp button works
- [ ] No console errors

### Backend Tests
- [ ] Health endpoint: `/health` returns OK
- [ ] Jobs API: `/api/jobs` returns data
- [ ] Courses API: `/api/courses` returns data
- [ ] Single job: `/api/jobs/slug/job-slug` works
- [ ] Single course: `/api/courses/slug/course-slug` works

### Integration Tests
- [ ] Job application form submits
- [ ] Course enrollment form submits
- [ ] Contact form submits
- [ ] Newsletter signup works
- [ ] WhatsApp link opens correctly

---

## 📧 Optional: Email Configuration

### Gmail Setup
- [ ] 2FA enabled on Gmail
- [ ] App password generated
- [ ] Environment variables added:
  - [ ] `SMTP_HOST` = `smtp.gmail.com`
  - [ ] `SMTP_PORT` = `587`
  - [ ] `SMTP_USER` = your-email@gmail.com
  - [ ] `SMTP_PASS` = app-password
- [ ] Test email sent successfully

---

## 📁 Optional: File Upload (Cloudinary)

### Cloudinary Setup
- [ ] Account created at https://cloudinary.com
- [ ] Cloud name copied
- [ ] API key copied
- [ ] API secret copied
- [ ] Environment variables added:
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
- [ ] Upload middleware updated
- [ ] Test file upload works

---

## 🔒 Security Checklist

### Environment Variables
- [ ] No `.env` files in Git
- [ ] All secrets in environment variables
- [ ] JWT secret is strong (32+ chars)
- [ ] Database password is strong

### CORS & Security
- [ ] CORS only allows frontend domain
- [ ] HTTPS enabled (automatic)
- [ ] Helmet middleware enabled
- [ ] Rate limiting configured

---

## 🌍 Optional: Custom Domain

### Domain Purchase
- [ ] Domain purchased (Namecheap/GoDaddy)
- [ ] Domain name: ________________

### Frontend Domain (Vercel)
- [ ] Domain added in Vercel settings
- [ ] DNS records configured
- [ ] Domain verified
- [ ] HTTPS certificate issued

### Backend Domain (Render)
- [ ] Subdomain configured (e.g., api.yourdomain.com)
- [ ] CNAME record added
- [ ] Domain verified
- [ ] HTTPS certificate issued

### Update URLs
- [ ] Frontend `NEXT_PUBLIC_API_URL` updated
- [ ] Backend `FRONTEND_URL` updated
- [ ] Both services redeployed

---

## 📊 Monitoring Setup

### Vercel Analytics
- [ ] Analytics enabled in Vercel dashboard
- [ ] Monitoring page views

### Render Monitoring
- [ ] Metrics dashboard reviewed
- [ ] Logs accessible

### Uptime Monitoring
- [ ] UptimeRobot account created (optional)
- [ ] Frontend monitor added
- [ ] Backend monitor added
- [ ] Email alerts configured

---

## 📝 Documentation

### Update README
- [ ] Live URLs added to README
- [ ] Deployment status badge added
- [ ] Demo credentials documented (if any)

### Team Handoff
- [ ] Deployment guide shared
- [ ] Environment variables documented
- [ ] Access credentials shared securely
- [ ] Monitoring dashboard access provided

---

## 🎉 Launch Checklist

### Final Verification
- [ ] All pages load correctly
- [ ] All forms work
- [ ] All API calls successful
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] No broken links
- [ ] SEO meta tags present

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 80

### Go Live
- [ ] Announce to stakeholders
- [ ] Share website URL
- [ ] Monitor for first 24 hours
- [ ] Collect initial feedback

---

## 📞 Important URLs

**Record your deployment URLs here:**

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://________________ | ⬜ |
| **Backend** | https://________________ | ⬜ |
| **Database** | (connection string saved) | ⬜ |
| **Custom Domain** | https://________________ | ⬜ |

---

## 🆘 Emergency Contacts

| Service | Support | URL |
|---------|---------|-----|
| Vercel | support@vercel.com | https://vercel.com/support |
| Render | support@render.com | https://render.com/docs |
| Neon | support@neon.tech | https://neon.tech/docs |

---

## 📅 Post-Deployment Schedule

### Daily (First Week)
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review user feedback

### Weekly
- [ ] Review analytics
- [ ] Check performance metrics
- [ ] Backup database

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization

---

## ✅ Deployment Complete!

**Congratulations! Your Skill2Hire platform is live!** 🎊

**Next Steps:**
1. Share with team
2. Announce to users
3. Monitor performance
4. Gather feedback
5. Plan next features

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Version:** 1.0.0
