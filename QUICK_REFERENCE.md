# ⚡ Skill2Hire Platform - Quick Reference Guide

## 🚀 Quick Commands

### Start Development Servers
```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm run dev
```

### Database Commands
```bash
cd backend

# View database in browser
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Seed database with sample data
npm run prisma:seed

# Generate Prisma client
npx prisma generate
```

### Build for Production
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm run build && npm start
```

---

## 📁 Key Files & Locations

### Frontend
```
frontend/src/app/page.tsx                    # Homepage
frontend/src/components/home/FeaturedJobs.tsx # Featured Jobs component
frontend/src/components/home/FeaturedCourses.tsx # Featured Courses component
frontend/src/lib/api.ts                      # API client
frontend/.env.local                          # Environment variables
```

### Backend
```
backend/src/server.ts                        # Entry point
backend/src/routes/                          # API routes
backend/src/controllers/                     # Request handlers
backend/prisma/schema.prisma                 # Database schema
backend/prisma/seed.ts                       # Seed data
backend/.env                                 # Environment variables
```

---

## 🔌 API Endpoints Quick Reference

### Jobs
```
GET    /api/jobs                 # List all jobs
GET    /api/jobs/:id             # Get job by ID
GET    /api/jobs/slug/:slug      # Get job by slug
POST   /api/jobs/:id/apply       # Apply for job
POST   /api/jobs                 # Create job (admin)
PUT    /api/jobs/:id             # Update job (admin)
DELETE /api/jobs/:id             # Delete job (admin)
```

### Courses
```
GET    /api/courses              # List all courses
GET    /api/courses/:id          # Get course by ID
GET    /api/courses/slug/:slug   # Get course by slug
POST   /api/courses/:id/enroll   # Enroll in course
POST   /api/courses              # Create course (admin)
PUT    /api/courses/:id          # Update course (admin)
DELETE /api/courses/:id          # Delete course (admin)
```

### Leads
```
POST   /api/leads/contact        # Submit contact form
POST   /api/leads/newsletter     # Subscribe to newsletter
GET    /api/leads                # Get all leads (admin)
```

### Auth
```
POST   /api/auth/login           # Admin login
GET    /api/auth/me              # Get current user
```

---

## 🎨 Tailwind Classes Quick Reference

### Layout
```css
container-custom     /* Max-width container with padding */
section-title        /* Large heading style */
section-subtitle     /* Subtitle style */
```

### Buttons
```css
btn btn-primary      /* Primary blue button */
btn btn-secondary    /* Green button */
btn btn-outline      /* Outlined button */
```

### Cards
```css
card                 /* White card with shadow and padding */
```

### Forms
```css
input                /* Form input field */
label                /* Form label */
```

### Colors
```css
bg-primary           /* #1E6DCC - Primary Blue */
bg-secondary         /* #28A745 - Secondary Green */
bg-navy              /* #0D2B45 - Navy */
text-primary         /* Primary blue text */
text-secondary       /* Green text */
text-navy            /* Navy text */
```

### Gradients
```css
bg-gradient-primary  /* Primary gradient background */
bg-gradient-dark     /* Dark gradient background */
```

---

## 🗄️ Database Schema Quick Reference

### Jobs Table
```typescript
{
  id: string
  title: string
  slug: string
  description: string
  location: string
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP"
  experienceLevel: "ENTRY_LEVEL" | "MID_LEVEL" | "SENIOR_LEVEL"
  salaryMin: number (in paise)
  salaryMax: number (in paise)
  salaryCurrency: string
  department: string
  skills: string[]
  benefits: string[]
  expiresAt: Date | null
}
```

### Courses Table
```typescript
{
  id: string
  title: string
  slug: string
  description: string
  overview: string
  curriculum: string (comma-separated)
  duration: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  price: number (in paise)
  discountPrice: number | null (in paise)
  category: string
  skills: string[]
  studentsEnrolled: number
}
```

---

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=+918220333917
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

---

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Prisma Client Issues
```bash
cd backend
rm -rf node_modules
npm install
npx prisma generate
```

### Database Reset
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

### Clear Next.js Cache
```bash
cd frontend
rm -rf .next
npm run dev
```

---

## 📊 Data Format Examples

### Job Application
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+918220333917",
  "experience": "3 years",
  "currentCompany": "Tech Corp",
  "expectedSalary": "10-12 LPA",
  "noticePeriod": "30 days",
  "coverLetter": "I am interested...",
  "resume": File
}
```

### Course Enrollment
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+918220333917",
  "education": "B.Tech",
  "currentStatus": "Working Professional",
  "message": "Looking to upskill...",
  "preferredBatch": "Weekend"
}
```

---

## 🎯 Testing URLs

### Local Development
```
Homepage:        http://localhost:3000
Jobs Listing:    http://localhost:3000/jobs
Job Detail:      http://localhost:3000/jobs/[slug]
Courses Listing: http://localhost:3000/courses
Course Detail:   http://localhost:3000/courses/[slug]
About:           http://localhost:3000/about
Contact:         http://localhost:3000/contact
Admin:           http://localhost:3000/admin

Backend Health:  http://localhost:5000/health
API Docs:        http://localhost:5000/api
Prisma Studio:   http://localhost:5555
```

---

## 🔑 Important Notes

### Currency Storage
- **All prices stored in paise** (multiply by 100)
- Example: ₹25,000 = 2500000 paise
- Display: Divide by 100 when showing to user

### Slug vs ID
- **Use slug for URLs**: `/jobs/senior-developer`
- **Use ID for API calls**: Internal references
- Slugs are SEO-friendly and user-readable

### File Uploads
- **Max size**: 5MB
- **Allowed types**: PDF, DOC, DOCX
- **Storage**: Local (dev), Cloudinary (production)

### Authentication
- **JWT tokens** stored in localStorage
- **Token expiry**: 7 days
- **Protected routes** require valid token

---

## 📞 Quick Help

### Documentation
- Architecture: `ARCHITECTURE.md`
- Developer Guide: `DEVELOPER_GUIDE.md`
- Running Guide: `RUNNING.md`
- Main README: `README.md`

### Useful Commands
```bash
# Check Node version
node --version

# Check npm version
npm --version

# View all npm scripts
npm run

# Install specific package
npm install package-name

# Update dependencies
npm update
```

---

**Keep this guide handy for quick reference!** 📌

**Last Updated**: May 2, 2026
