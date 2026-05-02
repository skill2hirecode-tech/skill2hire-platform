# 🚀 Skill2Hire Platform - Running Guide

## ✅ Current Status

**Both Frontend and Backend are RUNNING!**

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Status**: ✅ Running
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS

### Backend (Express API)
- **URL**: http://localhost:5000
- **Status**: ✅ Running  
- **Framework**: Node.js + Express + TypeScript
- **Database**: SQLite (dev.db) - No setup required!

---

## 🎯 What's Working

### Frontend Features
✅ Beautiful, modern homepage with:
- Professional navbar with logo
- Hero section with gradient background
- Services showcase (6 services)
- Featured jobs section
- Featured courses section
- Why Choose Us section
- Contact form
- Professional footer
- WhatsApp floating button
- Cookie consent banner (GDPR compliant)

### Backend API
✅ Full REST API with:
- Authentication endpoints (`/api/auth/*`)
- Jobs endpoints (`/api/jobs/*`)
- Courses endpoints (`/api/courses/*`)
- Leads endpoints (`/api/leads/*`)
- File upload endpoints (`/api/upload/*`)
- Health check (`/health`)

### Database
✅ SQLite database with tables for:
- Users (admin authentication)
- Jobs (job postings)
- Job Applications (with resume uploads)
- Courses (training programs)
- Course Enrollments
- Contact Leads
- Newsletter subscriptions

---

## 📱 How to Use

### View the Website
1. Open your browser
2. Go to: **http://localhost:3000**
3. Explore the beautiful homepage!

### Test the API
1. Open your browser or Postman
2. Go to: **http://localhost:5000/health**
3. You should see: `{"status":"success","message":"Skill2Hire API is running"}`

---

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Backend
```bash
cd backend
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
```

### Database
```bash
cd backend
npx prisma studio              # Open database GUI
npx prisma migrate dev         # Create new migration
npx prisma generate            # Regenerate Prisma client
```

---

## 🎨 Brand Identity

### Colors
- **Primary Blue**: #1E6DCC
- **Secondary Green**: #28A745
- **Navy**: #0D2B45
- **Light Gray**: #F2F4F7

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

---

## 📊 API Endpoints

### Public Endpoints
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply for job (with resume upload)
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/leads/contact` - Submit contact form
- `POST /api/leads/newsletter` - Subscribe to newsletter

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/leads` - Get all leads

---

## 🔐 Default Admin Account

**Note**: No admin account exists yet. To create one, you'll need to:

1. Hash a password using bcrypt
2. Insert directly into the database, OR
3. Use Prisma Studio to create a user

Example using Prisma Studio:
```bash
cd backend
npx prisma studio
```

Then create a user with:
- Email: admin@skill2hire.com
- Password: (hashed with bcrypt)
- Role: SUPER_ADMIN

---

## 🌐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=+918220333917
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="skill2hire-super-secret-jwt-key-change-in-production-2024"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

---

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (Prisma ORM)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Express Validator + Zod
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer (ready for Cloudinary)
- **Email**: Nodemailer/SendGrid (configured but optional)

---

## 🚀 Next Steps

### To Make It Production-Ready:

1. **Setup PostgreSQL** (replace SQLite)
   - Update `DATABASE_URL` in backend `.env`
   - Change `provider` in `prisma/schema.prisma` to `postgresql`
   - Run `npx prisma migrate dev`

2. **Configure File Storage**
   - Add Cloudinary credentials to backend `.env`
   - Resume uploads will work automatically

3. **Setup Email Service**
   - Add SendGrid API key OR Gmail SMTP credentials
   - Email notifications will work automatically

4. **Create Admin Account**
   - Use Prisma Studio or API to create first admin

5. **Deploy**
   - Frontend: Vercel (automatic with GitHub)
   - Backend: Railway, Render, or Heroku
   - Database: Supabase, Neon, or Railway

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
rm -rf dist node_modules
npm install
npx prisma generate
npm run dev
```

### Database issues
```bash
cd backend
rm -rf prisma/dev.db prisma/migrations
npx prisma migrate dev --name init
```

---

## 📞 Support

For issues or questions:
- Check the main README.md
- Review API documentation
- Check console logs for errors

---

**Built with ❤️ for Skill2Hire Technologies**
*Connecting Talent with Opportunity*
