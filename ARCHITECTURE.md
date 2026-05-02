# 🏗️ Skill2Hire Platform - Architecture Documentation

## 📋 Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [API Architecture](#api-architecture)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)

---

## 🎯 System Overview

Skill2Hire is a full-stack recruitment and training platform that connects job seekers with opportunities and provides professional training courses.

### Key Features
- **Job Portal**: Browse, search, and apply for jobs
- **Course Catalog**: Explore and enroll in training programs
- **Lead Management**: Capture and manage contact inquiries
- **Admin Panel**: Manage jobs, courses, and applications
- **Email Notifications**: Automated emails for applications and enrollments
- **File Uploads**: Resume and document management

---

## 🏛️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │    Mobile    │  │   Tablet     │          │
│  │  (Desktop)   │  │   Browser    │  │   Browser    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         └──────────────────┴──────────────────┘                   │
│                            │                                       │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Next.js 14 Application                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Pages   │  │Components│  │   API    │  │  Styles  │  │ │
│  │  │  (SSR)   │  │  (React) │  │  Client  │  │(Tailwind)│  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Port: 3000                                                       │
│  Tech: React 18, TypeScript, Tailwind CSS, React Query          │
│                                                                   │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           Express.js API Server (TypeScript)                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Routes  │  │Controller│  │Middleware│  │ Services │  │ │
│  │  │          │  │          │  │  (Auth)  │  │  (Email) │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Port: 5000                                                       │
│  Tech: Node.js, Express, TypeScript, JWT, Multer                │
│                                                                   │
└────────────────────────────┬─────────────────────────────────────┘
                             │ Prisma ORM
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  SQLite Database                            │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Users   │  │   Jobs   │  │ Courses  │  │  Leads   │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                │ │
│  │  │   Job    │  │  Course  │  │Newsletter│                │ │
│  │  │  Apps    │  │Enrollment│  │          │                │ │
│  │  └──────────┘  └──────────┘  └──────────┘                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  File: dev.db                                                     │
│  ORM: Prisma                                                      │
│  Upgradable to: PostgreSQL, MySQL                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   SendGrid   │  │  Cloudinary  │  │   WhatsApp   │          │
│  │    (Email)   │  │ (File Upload)│  │  Integration │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.1.4 | React framework with SSR |
| React | 18.2.0 | UI library |
| TypeScript | Latest | Type safety |
| Tailwind CSS | Latest | Styling framework |
| TanStack Query | 5.28.4 | Data fetching & caching |
| Axios | 1.6.7 | HTTP client |
| React Hook Form | 7.51.0 | Form management |
| Zod | 3.22.4 | Schema validation |
| Lucide React | 0.356.0 | Icon library |
| date-fns | 3.3.1 | Date formatting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | 4.18.3 | Web framework |
| TypeScript | Latest | Type safety |
| Prisma | 5.11.0 | ORM |
| SQLite | Latest | Database (dev) |
| JWT | Latest | Authentication |
| Bcrypt | 2.4.3 | Password hashing |
| Multer | Latest | File uploads |
| Nodemailer | Latest | Email service |
| Helmet | Latest | Security headers |
| CORS | 2.8.5 | Cross-origin requests |

---

## 📁 Project Structure

```
skill2hire-platform/
│
├── frontend/                    # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── jobs/           # Jobs pages
│   │   │   │   ├── page.tsx    # Jobs listing
│   │   │   │   └── [slug]/     # Job detail page
│   │   │   ├── courses/        # Courses pages
│   │   │   │   ├── page.tsx    # Courses listing
│   │   │   │   └── [slug]/     # Course detail page
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   └── admin/          # Admin panel
│   │   │
│   │   ├── components/         # React Components
│   │   │   ├── layout/         # Layout components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── home/           # Homepage components
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── FeaturedJobs.tsx
│   │   │   │   └── FeaturedCourses.tsx
│   │   │   └── shared/         # Shared components
│   │   │       └── WhatsAppButton.tsx
│   │   │
│   │   └── lib/                # Utilities
│   │       └── api.ts          # API client
│   │
│   ├── public/                 # Static assets
│   ├── .env.local              # Environment variables
│   └── package.json
│
├── backend/                    # Express.js Backend API
│   ├── src/
│   │   ├── server.ts           # Entry point
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── job.routes.ts
│   │   │   ├── course.routes.ts
│   │   │   ├── lead.routes.ts
│   │   │   └── upload.routes.ts
│   │   │
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── job.controller.ts
│   │   │   ├── course.controller.ts
│   │   │   └── lead.controller.ts
│   │   │
│   │   ├── middleware/         # Middleware functions
│   │   │   ├── auth.middleware.ts
│   │   │   └── upload.middleware.ts
│   │   │
│   │   └── utils/              # Utility functions
│   │       └── email.service.ts
│   │
│   ├── prisma/                 # Database
│   │   ├── schema.prisma       # Database schema
│   │   ├── seed.ts             # Seed data
│   │   └── dev.db              # SQLite database
│   │
│   ├── .env                    # Environment variables
│   └── package.json
│
├── ARCHITECTURE.md             # This file
├── DEVELOPER_GUIDE.md          # Developer onboarding
├── README.md                   # Project overview
└── RUNNING.md                  # Running instructions
```

---

## 🔄 Data Flow

### 1. Job Application Flow
```
User → Browse Jobs → Select Job → Fill Application Form → Upload Resume
  ↓
Frontend validates form → API call to /api/jobs/:id/apply
  ↓
Backend receives request → Validates data → Uploads resume to storage
  ↓
Saves application to database → Sends confirmation email
  ↓
Returns success response → Frontend shows success message
```

### 2. Course Enrollment Flow
```
User → Browse Courses → Select Course → Fill Enrollment Form
  ↓
Frontend validates form → API call to /api/courses/:id/enroll
  ↓
Backend receives request → Validates data → Checks course availability
  ↓
Saves enrollment to database → Sends welcome email
  ↓
Returns success response → Frontend shows confirmation
```

### 3. Authentication Flow
```
Admin → Login Page → Enter credentials
  ↓
Frontend → API call to /api/auth/login
  ↓
Backend → Validates credentials → Generates JWT token
  ↓
Returns token → Frontend stores in localStorage
  ↓
Subsequent requests include token in Authorization header
  ↓
Backend middleware validates token → Allows/Denies access
```

---

## 🔌 API Architecture

### REST API Endpoints

#### Public Endpoints
```
GET    /api/jobs              # List all jobs
GET    /api/jobs/:id          # Get job by ID
GET    /api/jobs/slug/:slug   # Get job by slug
POST   /api/jobs/:id/apply    # Apply for job

GET    /api/courses           # List all courses
GET    /api/courses/:id       # Get course by ID
GET    /api/courses/slug/:slug # Get course by slug
POST   /api/courses/:id/enroll # Enroll in course

POST   /api/leads/contact     # Submit contact form
POST   /api/leads/newsletter  # Subscribe to newsletter

GET    /health                # Health check
```

#### Protected Endpoints (Require Authentication)
```
POST   /api/auth/login        # Admin login
GET    /api/auth/me           # Get current user

POST   /api/jobs              # Create job
PUT    /api/jobs/:id          # Update job
DELETE /api/jobs/:id          # Delete job

POST   /api/courses           # Create course
PUT    /api/courses/:id       # Update course
DELETE /api/courses/:id       # Delete course

GET    /api/leads             # Get all leads
POST   /api/upload            # Upload files
```

### API Response Format
```json
{
  "status": "success" | "error",
  "data": {
    // Response data
  },
  "message": "Optional message",
  "errors": [] // Validation errors if any
}
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐
│    User     │
├─────────────┤
│ id          │
│ email       │
│ password    │
│ name        │
│ role        │
│ createdAt   │
└─────────────┘

┌─────────────┐         ┌──────────────────┐
│     Job     │────────<│  JobApplication  │
├─────────────┤         ├──────────────────┤
│ id          │         │ id               │
│ title       │         │ jobId            │
│ slug        │         │ fullName         │
│ description │         │ email            │
│ location    │         │ phone            │
│ jobType     │         │ resumeUrl        │
│ salaryMin   │         │ status           │
│ salaryMax   │         │ createdAt        │
│ skills[]    │         └──────────────────┘
│ createdAt   │
└─────────────┘

┌─────────────┐         ┌──────────────────┐
│   Course    │────────<│ CourseEnrollment │
├─────────────┤         ├──────────────────┤
│ id          │         │ id               │
│ title       │         │ courseId         │
│ slug        │         │ fullName         │
│ description │         │ email            │
│ duration    │         │ phone            │
│ level       │         │ status           │
│ price       │         │ createdAt        │
│ skills[]    │         └──────────────────┘
│ createdAt   │
└─────────────┘

┌─────────────┐         ┌──────────────────┐
│ContactLead  │         │   Newsletter     │
├─────────────┤         ├──────────────────┤
│ id          │         │ id               │
│ name        │         │ email            │
│ email       │         │ isActive         │
│ phone       │         │ subscribedAt     │
│ message     │         └──────────────────┘
│ status      │
│ createdAt   │
└─────────────┘
```

### Key Tables

#### Jobs
- Stores job postings
- Fields: title, description, location, salary range, skills
- Relationships: One-to-many with JobApplications

#### Courses
- Stores training courses
- Fields: title, description, duration, price, curriculum
- Relationships: One-to-many with CourseEnrollments

#### Users
- Admin users for authentication
- Fields: email, password (hashed), role
- Roles: SUPER_ADMIN, ADMIN, MANAGER

---

## 🔒 Security

### Authentication
- **JWT Tokens**: Stateless authentication
- **Bcrypt**: Password hashing with salt rounds
- **Token Expiry**: 7 days default

### Authorization
- **Role-based Access Control (RBAC)**
- **Middleware Protection**: Protected routes require valid JWT
- **Admin-only Endpoints**: Create, update, delete operations

### Data Protection
- **Input Validation**: Express Validator + Zod schemas
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: Helmet middleware
- **CORS**: Configured for frontend origin only
- **Rate Limiting**: Prevents brute force attacks

### File Upload Security
- **File Type Validation**: Only PDF, DOC, DOCX for resumes
- **File Size Limits**: Max 5MB per file
- **Sanitized Filenames**: Prevents directory traversal

---

## 🚀 Deployment

### Development
```bash
# Frontend
cd frontend
npm run dev  # Runs on http://localhost:3000

# Backend
cd backend
npm run dev  # Runs on http://localhost:5000
```

### Production

#### Frontend (Vercel)
```bash
cd frontend
npm run build
npm start
```

#### Backend (Railway/Render/Heroku)
```bash
cd backend
npm run build
npm start
```

#### Database Migration
```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=+918220333917
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

---

## 📊 Performance Considerations

### Frontend
- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for data caching

### Backend
- **Database Indexing**: Prisma indexes on frequently queried fields
- **Connection Pooling**: Prisma connection management
- **Response Compression**: Gzip middleware
- **Rate Limiting**: Prevents API abuse

---

## 🔄 Upgrade Path

### Database
Current: SQLite → Production: PostgreSQL
```prisma
// Change in schema.prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### File Storage
Current: Local → Production: Cloudinary/AWS S3
- Update upload middleware
- Configure cloud storage credentials

### Email Service
Current: Nodemailer → Production: SendGrid
- Add SendGrid API key
- Update email service configuration

---

## 📞 Support & Maintenance

### Monitoring
- Application logs
- Error tracking (recommended: Sentry)
- Performance monitoring

### Backup Strategy
- Database: Daily automated backups
- Files: Cloud storage redundancy
- Code: Git version control

---

**Last Updated**: May 2, 2026  
**Version**: 1.0.0  
**Maintained By**: Skill2Hire Technologies Team
