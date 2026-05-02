# 💼 Jobs System - Complete Implementation Guide

## 🎯 Overview

The Jobs system allows:
1. **Admin** - Post and update jobs daily
2. **Users** - Browse jobs and apply with resume
3. **Email Notifications** - Admin gets notified when someone applies

---

## ✅ What's Been Implemented

### 1. **Backend (Already Complete)**
- ✅ Job CRUD API endpoints
- ✅ Job application with resume upload
- ✅ Email notifications to admin
- ✅ PostgreSQL database with Prisma

### 2. **Frontend (Just Created)**
- ✅ Jobs listing page (`/jobs`)
- ✅ Job detail page (`/jobs/[slug]`)
- ✅ Application form with resume upload
- ✅ Search and filter functionality

### 3. **Database**
- ✅ 6 sample jobs added
- ✅ Jobs table with all fields
- ✅ Job applications table

---

## 📊 Database Schema

### Jobs Table
```prisma
model Job {
  id               String           @id @default(cuid())
  title            String
  slug             String           @unique
  description      String           @db.Text
  requirements     String           @db.Text
  responsibilities String           @db.Text
  location         String
  jobType          JobType          // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
  experienceLevel  ExperienceLevel  // ENTRY_LEVEL, MID_LEVEL, SENIOR_LEVEL
  salaryMin        Int?
  salaryMax        Int?
  salaryCurrency   String           @default("INR")
  department       String?
  skills           String[]
  benefits         String[]
  isActive         Boolean          @default(true)
  expiresAt        DateTime?
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  applications     JobApplication[]
}
```

### Job Applications Table
```prisma
model JobApplication {
  id              String   @id @default(cuid())
  jobId           String
  job             Job      @relation(fields: [jobId], references: [id])
  fullName        String
  email           String
  phone           String
  experience      String
  currentCompany  String?
  expectedSalary  String?
  noticePeriod    String?
  coverLetter     String?  @db.Text
  resumeUrl       String
  status          ApplicationStatus @default(PENDING)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 🔌 API Endpoints

### Public Endpoints (No Auth)

#### 1. Get All Jobs
```
GET /api/jobs?page=1&limit=10&jobType=FULL_TIME&location=Bangalore

Response:
{
  "status": "success",
  "data": {
    "jobs": [
      {
        "id": "clxxx...",
        "title": "Senior Full Stack Developer",
        "slug": "senior-full-stack-developer",
        "description": "...",
        "location": "Bangalore, Karnataka",
        "jobType": "FULL_TIME",
        "experienceLevel": "SENIOR_LEVEL",
        "salaryMin": 1500000,
        "salaryMax": 2500000,
        "salaryCurrency": "INR",
        "department": "Engineering",
        "skills": ["React", "Node.js", ...],
        "createdAt": "2026-05-01T..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 6,
      "totalPages": 1
    }
  }
}
```

#### 2. Get Job by Slug
```
GET /api/jobs/slug/senior-full-stack-developer

Response:
{
  "status": "success",
  "data": {
    "job": {
      "id": "clxxx...",
      "title": "Senior Full Stack Developer",
      "slug": "senior-full-stack-developer",
      "description": "...",
      "requirements": "...",
      "responsibilities": "...",
      "location": "Bangalore, Karnataka",
      "jobType": "FULL_TIME",
      "experienceLevel": "SENIOR_LEVEL",
      "salaryMin": 1500000,
      "salaryMax": 2500000,
      "skills": [...],
      "benefits": [...],
      "expiresAt": "2026-06-01T...",
      ...
    }
  }
}
```

#### 3. Apply for Job
```
POST /api/jobs/:id/apply
Content-Type: multipart/form-data

Form Data:
- jobId: string
- fullName: string
- email: string
- phone: string
- experience: string
- currentCompany: string (optional)
- expectedSalary: string (optional)
- noticePeriod: string (optional)
- coverLetter: string (optional)
- resume: File (PDF/DOC/DOCX, max 5MB)

Response:
{
  "status": "success",
  "data": {
    "application": {
      "id": "clxxx...",
      "jobId": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "status": "PENDING",
      "resumeUrl": "https://...",
      "createdAt": "..."
    }
  },
  "message": "Application submitted successfully"
}
```

---

## 📧 Email Notifications

### When Someone Applies for a Job:

**Email to Admin (skill2hirecode@gmail.com):**
```
Subject: New Job Application - Senior Full Stack Developer - John Doe

Body:
- Applicant Name: John Doe
- Email: john@example.com
- Phone: +91 98765 43210
- Experience: 5 years
- Current Company: ABC Tech
- Expected Salary: 20 LPA
- Notice Period: 30 days
- Resume: [Download Link]
- Application Date: 01-May-2026
```

**Email to Applicant:**
```
Subject: Application Received - Senior Full Stack Developer

Body:
- Thank you for applying
- We'll review your application
- Contact you soon
```

---

## 🎨 Frontend Pages

### 1. Jobs Listing Page (`/jobs`)

**Features:**
- Search bar (searches title, company, description)
- Filter by job type (Full-time, Part-time, Contract, Internship)
- Filter by location (Bangalore, Hyderabad, Remote, etc.)
- Shows job count
- Job cards with:
  - Title, company, location
  - Job type badge
  - Experience, salary, posted date
  - Skills tags
  - Apply button

**URL:** http://localhost:3002/jobs

### 2. Job Detail Page (`/jobs/[slug]`)

**Features:**
- Full job description
- Key responsibilities
- Requirements
- Required skills
- Benefits
- Application form (right sidebar):
  - Full name, email, phone
  - Experience, current company
  - Expected salary, notice period
  - Cover letter
  - Resume upload (PDF/DOC/DOCX)
  - Submit button

**URL:** http://localhost:3002/jobs/senior-full-stack-developer

---

## 👨‍💼 Admin Management

### How Admin Posts/Updates Jobs

**Option 1: Using Prisma Studio (GUI)**
```bash
cd backend
npx prisma studio
```
- Opens at http://localhost:5555
- Click `Job` table
- Add/Edit/Delete jobs
- Changes reflect immediately on frontend

**Option 2: Using API (Postman/Code)**
```
POST /api/jobs
Headers: Authorization: Bearer <JWT_TOKEN>

Body:
{
  "title": "New Job Title",
  "slug": "new-job-title",
  "description": "...",
  "requirements": "...",
  "responsibilities": "...",
  "location": "Bangalore",
  "jobType": "FULL_TIME",
  "experienceLevel": "MID_LEVEL",
  "salaryMin": 1000000,
  "salaryMax": 1500000,
  "skills": ["React", "Node.js"],
  "benefits": ["Health Insurance", "WFH"],
  "isActive": true,
  "expiresAt": "2026-06-30"
}
```

### How Admin Views Applications

**Prisma Studio:**
- Click `JobApplication` table
- See all applications with:
  - Applicant details
  - Job applied for
  - Resume URL
  - Status
  - Application date

**Or create Admin Dashboard:**
- URL: `/admin/applications`
- Shows table of all applications
- Filter by job, status, date
- Download resumes
- Update application status

---

## 🚀 How to Use

### For Users (Job Seekers):

1. **Browse Jobs:**
   - Visit: http://localhost:3002/jobs
   - Search or filter jobs
   - Click on a job to see details

2. **Apply for Job:**
   - Fill application form
   - Upload resume (PDF/DOC/DOCX, max 5MB)
   - Click "Submit Application"
   - Receive confirmation email

3. **Track Application:**
   - Check email for updates
   - Admin will contact if shortlisted

### For Admin:

1. **Post New Job:**
   ```bash
   # Option 1: Prisma Studio
   cd backend
   npx prisma studio
   # Add job in GUI

   # Option 2: Run seed script with new jobs
   npx ts-node prisma/seed-jobs.ts
   ```

2. **View Applications:**
   ```bash
   # Prisma Studio
   npx prisma studio
   # Click JobApplication table
   ```

3. **Get Email Notifications:**
   - Automatically receive email when someone applies
   - Email contains all applicant details
   - Resume download link included

---

## 📝 Sample Jobs Added

1. **Senior Full Stack Developer** - Bangalore - 15-25 LPA
2. **ServiceNow Developer** - Hyderabad - 10-18 LPA
3. **QA Automation Engineer** - Pune - 8-12 LPA
4. **.NET Developer** - Chennai - 12-20 LPA
5. **VLSI Design Engineer** - Bangalore - 10-16 LPA
6. **Data Science Intern** - Remote - 15-25K/month

---

## 🔧 Configuration

### Resume Upload

**Current Setup:**
- Stored locally in `backend/uploads/resumes/`
- File size limit: 5MB
- Allowed formats: PDF, DOC, DOCX

**For Production:**
Update `backend/src/routes/upload.routes.ts` to use:
- **Cloudinary** - For cloud storage
- **AWS S3** - For scalable storage

### Email Configuration

Already configured in `backend/.env`:
```env
ADMIN_EMAIL="skill2hirecode@gmail.com"
SMTP_USER="skill2hirecode@gmail.com"
SMTP_PASS="qmtmratsclubbjgr"
```

---

## 🧪 Testing

### Test Job Application:

1. **Visit a job:**
   ```
   http://localhost:3002/jobs/senior-full-stack-developer
   ```

2. **Fill form and submit**

3. **Check:**
   - Database: `npx prisma studio` → JobApplication table
   - Email: skill2hirecode@gmail.com inbox
   - Resume: `backend/uploads/resumes/` folder

---

## 📊 Dynamic Updates

**Jobs are automatically dynamic:**
- Frontend fetches from API on every page load
- Admin adds/updates job in database
- Changes appear immediately on website
- No frontend code changes needed

**To update jobs daily:**
```bash
# Method 1: Prisma Studio (GUI)
cd backend
npx prisma studio
# Edit jobs in browser

# Method 2: SQL
psql -U postgres -d skill2hire_db
UPDATE jobs SET title='New Title' WHERE id='xxx';

# Method 3: API
# Use Postman or code to call PUT /api/jobs/:id
```

---

## 🎯 Summary

✅ **Jobs Listing** - Dynamic, searchable, filterable  
✅ **Job Details** - Complete information with application form  
✅ **Job Application** - Resume upload + email notification  
✅ **Admin Email** - Notified on every application  
✅ **Database** - 6 sample jobs added  
✅ **Dynamic** - Admin can update anytime, reflects immediately  

**Everything is ready to use!** 🚀

Visit http://localhost:3002/jobs to see the jobs page!

---

**Last Updated:** 2026-05-01  
**Admin Email:** skill2hirecode@gmail.com
