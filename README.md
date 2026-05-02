# Skill2Hire Technologies Platform

**Connecting Talent with Opportunity**

A comprehensive recruitment and training platform built with modern web technologies, featuring job listings, course enrollment, admin management, and lead capture capabilities.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Complete system architecture, diagrams, and technical details |
| [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) | Developer onboarding, code standards, and best practices |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | **Complete deployment guide to publish your website** |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Step-by-step deployment checklist |
| [RUNNING.md](./RUNNING.md) | Step-by-step guide to run the application locally |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick commands and common tasks reference |

---

## 🏗️ Architecture Overview

### Tech Stack

**Frontend:**
- Next.js 14 (React 18) with App Router
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Hook Form + Zod validation
- TanStack Query (React Query)

**Backend:**
- Node.js + Express.js
- TypeScript
- PostgreSQL (via Supabase/Neon)
- Prisma ORM
- JWT Authentication
- Multer + AWS S3/Cloudinary for file uploads

**Infrastructure:**
- Vercel (Frontend hosting)
- Railway/Render (Backend hosting)
- Supabase/Neon (Database)
- AWS S3/Cloudinary (File storage)
- SendGrid/Nodemailer (Email)

---

## 📁 Project Structure

```
skill2hire-platform/
├── frontend/                 # Next.js 14 application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── (public)/    # Public routes
│   │   │   │   ├── page.tsx           # Home page
│   │   │   │   ├── courses/           # Course catalog
│   │   │   │   ├── jobs/              # Job listings
│   │   │   │   └── about/             # About page
│   │   │   ├── (admin)/     # Protected admin routes
│   │   │   │   └── admin/
│   │   │   │       ├── dashboard/
│   │   │   │       ├── jobs/
│   │   │   │       ├── courses/
│   │   │   │       └── leads/
│   │   │   ├── api/         # API routes (optional)
│   │   │   └── layout.tsx
│   │   ├── components/      # React components
│   │   │   ├── ui/          # Shadcn components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── forms/       # Form components
│   │   │   └── shared/      # Shared components
│   │   ├── lib/             # Utilities
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   ├── public/
│   │   ├── images/
│   │   └── logo/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models (Prisma)
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utilities
│   │   └── server.ts        # Entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/                     # Documentation
│   ├── API.md               # API documentation
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── SETUP.md             # Setup instructions
│
└── README.md                # This file
```

---

## 🚀 Features

### Core Features
- ✅ **Job Listings** - Browse and apply for jobs with resume upload
- ✅ **Course Catalog** - Explore training courses and enroll
- ✅ **Lead Capture** - All form submissions stored in database
- ✅ **Email Notifications** - Automated alerts for new applications
- ✅ **Resume Upload** - PDF/DOCX support with cloud storage
- ✅ **WhatsApp Integration** - Floating WhatsApp CTA button

### Admin Panel
- ✅ **Authentication** - Secure JWT-based admin login
- ✅ **Job Management** - Create, edit, delete job postings
- ✅ **Course Management** - Manage course catalog
- ✅ **Lead Management** - View applicants, download resumes
- ✅ **Dashboard** - Analytics and overview

### SEO & Performance
- ✅ **Server-Side Rendering** - SSR for job and course pages
- ✅ **Static Generation** - SSG for marketing pages
- ✅ **Meta Tags** - Proper SEO meta tags
- ✅ **Structured Data** - JobPosting schema for Google
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Performance** - Optimized bundle size

### Compliance
- ✅ **Cookie Consent** - GDPR/PDPB compliant
- ✅ **Privacy Policy** - Privacy and terms pages
- ✅ **Data Security** - Encrypted passwords, secure file uploads

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (Supabase/Neon account)
- AWS S3 or Cloudinary account
- SendGrid account (for emails)

### 1. Clone and Install

```bash
# Clone the repository
cd skill2hire-platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

**Backend (.env):**
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/skill2hire"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# AWS S3 (or Cloudinary)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="skill2hire-uploads"

# Email (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@skill2hire.com"
ADMIN_EMAIL="hr@skill2hire.com"

# WhatsApp
WHATSAPP_NUMBER="+919876543210"

# Server
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_WHATSAPP_NUMBER="+919876543210"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 4. Run Development Servers

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

---

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (protected)
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - List all jobs (public)
- `GET /api/jobs/:id` - Get job details (public)
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)
- `POST /api/jobs/:id/apply` - Apply for job (public)

### Courses
- `GET /api/courses` - List all courses (public)
- `GET /api/courses/:id` - Get course details (public)
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)
- `POST /api/courses/:id/enroll` - Enroll in course (public)

### Leads
- `GET /api/leads` - Get all leads (admin)
- `GET /api/leads/:id` - Get lead details (admin)
- `DELETE /api/leads/:id` - Delete lead (admin)

### File Upload
- `POST /api/upload/resume` - Upload resume (multipart/form-data)

---

## 🎨 Design System

### Brand Colors
- **Primary Blue:** `#1E6DCC` (#1E6DCC)
- **Primary Green:** `#28A745` (#28A745)
- **Dark Navy:** `#0D2B45` (#0D2B45)
- **Light Gray:** `#F2F4F7` (#F2F4F7)
- **Medium Gray:** `#6B7280` (#6B7280)

### Typography
- **Font Family:** Poppins (Google Fonts)
- **Headings:** Poppins Bold
- **Body:** Poppins Regular

### Components
- Built with Shadcn/ui for consistency
- Tailwind CSS for utility-first styling
- Responsive design (mobile-first)

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Render)
```bash
cd backend
# Push to GitHub
# Connect repository to Railway/Render
# Set environment variables
# Deploy
```

### Database (Supabase/Neon)
- Create project on Supabase/Neon
- Copy connection string to `DATABASE_URL`
- Run migrations: `npx prisma migrate deploy`

---

## 📊 Database Schema

### Tables
- **users** - Admin users
- **jobs** - Job postings
- **courses** - Training courses
- **job_applications** - Job applications with resumes
- **course_enrollments** - Course enrollment leads
- **contact_leads** - General contact form submissions

See `backend/prisma/schema.prisma` for full schema.

---

## 🔒 Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- Input validation with Zod
- SQL injection protection (Prisma)
- XSS protection
- CORS configuration
- Rate limiting
- File upload validation
- Environment variable protection

---

## 📈 Performance

- Next.js Image optimization
- Code splitting
- Lazy loading
- CDN for static assets
- Database indexing
- API response caching
- Gzip compression

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

---

## 📝 License

Proprietary - Skill2Hire Technologies

---

## 👥 Team

**Skill2Hire Technologies**  
*Connecting Talent with Opportunity*

- Website: www.skill2hiretechnologies.com
- Email: info@skill2hiretechnologies.com
- Phone: +91 98765 43210
- Location: Bangalore, India

---

## 🆘 Support

For technical support or questions:
- Email: tech@skill2hiretechnologies.com
- Documentation: See `/docs` folder
- Issues: Create an issue in the repository

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform features
- ✅ Admin panel
- ✅ Job & course management

### Phase 2 (Upcoming)
- 🔄 Advanced analytics dashboard
- 🔄 AI-powered job matching
- 🔄 Video course content
- 🔄 Payment integration
- 🔄 Mobile app (React Native)

### Phase 3 (Future)
- 📋 Applicant tracking system (ATS)
- 📋 Interview scheduling
- 📋 Skills assessment tests
- 📋 Certification management

---

**Built with ❤️ by Skill2Hire Technologies**
