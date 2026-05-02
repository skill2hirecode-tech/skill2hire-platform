# 📚 Course Enrollment System - Complete Implementation Guide

## 🎯 Overview

The course enrollment system allows students to enroll in courses through the website, and admins can view and manage all enrollments through the admin panel.

---

## 🔄 How It Works - Complete Flow

### 1. **Student Enrolls in a Course**

**Frontend (User Journey):**
1. Student visits `/courses` page
2. Browses available courses (ServiceNow, Testing with AI, .NET, VLSI)
3. Clicks on a course to see details at `/courses/[slug]`
4. Fills out enrollment form with:
   - Full Name
   - Email
   - Phone
   - Education (optional)
   - Message (optional)
5. Clicks "Submit Enrollment"

**What Happens:**
```typescript
// Frontend sends POST request to backend
POST http://localhost:5000/api/courses/{courseId}/enroll

Body: {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  education: "B.Tech CSE",
  message: "Interested in weekend batch",
  courseId: "1"
}
```

### 2. **Backend Processes the Enrollment**

**Location:** `backend/src/controllers/course.controller.ts` (Line 165-223)

**Process:**
```typescript
export const enrollInCourse = async (req: Request, res: Response) => {
  // 1. Validate input data
  // 2. Check if course exists
  // 3. Check if course is active
  // 4. Create enrollment record in database
  // 5. Send confirmation emails
  // 6. Return success response
}
```

**Database Storage:**
- Table: `course_enrollments`
- Fields stored:
  - `id` - Unique enrollment ID
  - `courseId` - Which course they enrolled in
  - `fullName` - Student's name
  - `email` - Student's email
  - `phone` - Student's phone
  - `education` - Educational background
  - `currentStatus` - Current employment status
  - `message` - Any message from student
  - `preferredBatch` - Preferred batch timing
  - `status` - PENDING, CONTACTED, ENROLLED, REJECTED, COMPLETED
  - `createdAt` - When they enrolled
  - `updatedAt` - Last update time

### 3. **Email Notifications Sent**

**Two emails are automatically sent:**

**A. To Admin (Course Enrollment Notification):**
```
Subject: New Course Enrollment - ServiceNow
Body:
- Student Name: John Doe
- Email: john@example.com
- Phone: +91 98765 43210
- Course: ServiceNow
```

**B. To Student (Welcome Email):**
```
Subject: Welcome to Skill2Hire Technologies!
Body:
- Thank you for enrolling
- We'll contact you soon
- Course details
```

**Email Service:** `backend/src/utils/email.service.ts`

### 4. **Admin Views Enrollments**

**Admin Panel Access:**
- URL: `/admin/enrollments`
- Shows all course enrollments in a table
- Can filter by status
- Can export to CSV

**Admin sees:**
- Student name and contact info
- Course enrolled in
- Education background
- Current status (PENDING, CONTACTED, etc.)
- Enrollment date
- Actions (View, Update status)

---

## 📊 Database Schema

### CourseEnrollment Table

```prisma
model CourseEnrollment {
  id              String   @id @default(cuid())
  courseId        String
  course          Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  fullName        String
  email           String
  phone           String
  education       String?
  currentStatus   String?
  message         String?
  preferredBatch  String?
  status          String   @default("PENDING")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([courseId])
  @@index([email])
  @@index([status])
  @@map("course_enrollments")
}
```

**Status Values:**
- `PENDING` - Just enrolled, waiting for contact
- `CONTACTED` - Admin has reached out
- `ENROLLED` - Student confirmed and enrolled
- `REJECTED` - Not suitable or declined
- `COMPLETED` - Finished the course

---

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Enroll in Course
```
POST /api/courses/:id/enroll

Request Body:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "education": "B.Tech CSE",
  "currentStatus": "Working Professional",
  "message": "Interested in weekend batch",
  "preferredBatch": "Weekend"
}

Response (201 Created):
{
  "status": "success",
  "data": {
    "enrollment": {
      "id": "clxxx...",
      "courseId": "1",
      "fullName": "John Doe",
      "email": "john@example.com",
      "status": "PENDING",
      "createdAt": "2026-05-01T12:00:00.000Z"
    }
  },
  "message": "Enrollment submitted successfully"
}
```

### Admin Endpoints (Authentication Required)

#### 2. Get All Enrollments for a Course
```
GET /api/courses/:id/enrollments?page=1&limit=20&status=PENDING

Headers:
Authorization: Bearer <JWT_TOKEN>

Response (200 OK):
{
  "status": "success",
  "data": {
    "enrollments": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

#### 3. Get All Enrollments (All Courses)
```
GET /api/enrollments?page=1&limit=20

Headers:
Authorization: Bearer <JWT_TOKEN>

Response: List of all enrollments across all courses
```

---

## 💻 Code Implementation

### Frontend Form Component

**File:** `frontend/src/app/courses/[slug]/page.tsx`

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/courses/${course.id}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        courseId: course.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Enrollment submitted successfully!');
      // Clear form
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Failed to submit enrollment');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Backend Controller

**File:** `backend/src/controllers/course.controller.ts`

```typescript
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    // Get course
    const course = await prisma.course.findUnique({ where: { id: req.params.id } });
    if (!course || !course.isActive) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }

    // Create enrollment
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: req.params.id,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        education: req.body.education,
        currentStatus: req.body.currentStatus,
        message: req.body.message,
        preferredBatch: req.body.preferredBatch,
      },
    });

    // Send emails (async, don't wait)
    Promise.all([
      sendCourseEnrollmentEmail({...}),
      sendWelcomeEmail({...})
    ]).catch(err => console.error('Email error:', err));

    // Return success
    res.status(201).json({
      status: 'success',
      data: { enrollment },
      message: 'Enrollment submitted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to submit enrollment' });
  }
};
```

---

## 👨‍💼 Admin Management

### How Admin Gets Notified

**1. Email Notification (Immediate)**
- Admin receives email at `info@skill2hiretechnologies.com`
- Contains all student details
- Can reply directly to student

**2. Admin Dashboard**
- Visit: `http://localhost:3002/admin/enrollments`
- See all enrollments in table format
- Filter by status
- Update enrollment status
- Export to CSV

### Admin Actions

**Update Enrollment Status:**
```typescript
// Admin can change status from PENDING to CONTACTED, ENROLLED, etc.
PUT /api/enrollments/:id/status

Body: {
  "status": "CONTACTED"
}
```

**View Enrollment Details:**
```typescript
GET /api/enrollments/:id

Response: Full enrollment details including course info
```

---

## 📧 Email Configuration

**File:** `backend/.env`

```env
# Email Service (Choose one)

# Option 1: SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Option 2: Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Email
ADMIN_EMAIL=info@skill2hiretechnologies.com
```

---

## 🔍 Testing the System

### Test Enrollment Flow

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Enroll in a course:**
   - Visit: http://localhost:3002/courses/servicenow
   - Fill out enrollment form
   - Submit

3. **Check database:**
   ```bash
   cd backend
   npx prisma studio
   ```
   - Open `course_enrollments` table
   - See your enrollment record

4. **View in admin panel:**
   - Visit: http://localhost:3002/admin/enrollments
   - See enrollment in table

---

## 📈 Enrollment Statistics

**Query enrollments by status:**
```sql
SELECT status, COUNT(*) as count
FROM course_enrollments
GROUP BY status;
```

**Get enrollments by course:**
```sql
SELECT c.title, COUNT(ce.id) as enrollments
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.courseId
GROUP BY c.id, c.title;
```

---

## 🚀 Production Deployment

### Environment Variables

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://api.skill2hiretechnologies.com/api
```

**Backend (.env.production):**
```env
DATABASE_URL=postgresql://user:pass@host:5432/skill2hire_db
SENDGRID_API_KEY=your_production_key
ADMIN_EMAIL=admin@skill2hiretechnologies.com
```

---

## 📊 Monitoring & Analytics

### Track Enrollment Metrics

1. **Total Enrollments:** Count of all enrollment records
2. **Conversion Rate:** Enrollments / Course Page Views
3. **Popular Courses:** Which courses get most enrollments
4. **Response Time:** Time from PENDING to CONTACTED
5. **Completion Rate:** ENROLLED to COMPLETED ratio

---

## 🔐 Security Considerations

1. **Input Validation:** All fields validated on backend
2. **Rate Limiting:** Prevent spam enrollments
3. **Email Verification:** Optional email confirmation
4. **Admin Authentication:** JWT required for admin endpoints
5. **Data Privacy:** GDPR compliant data handling

---

## 📝 Summary

**Data Flow:**
```
Student Form → Frontend API Call → Backend Validation → 
Database Storage → Email Notifications → Admin Dashboard
```

**Storage Location:**
- PostgreSQL database
- Table: `course_enrollments`
- Accessible via Prisma Studio or Admin Panel

**Admin Notification:**
- Email to admin@skill2hiretechnologies.com
- Admin dashboard at `/admin/enrollments`
- Real-time updates

**Status Tracking:**
- PENDING → CONTACTED → ENROLLED → COMPLETED
- Admin can update status at any time
- Student receives email at each status change

---

## 🎓 Next Steps

1. **Add email templates** for each status change
2. **Implement SMS notifications** for urgent updates
3. **Add payment integration** for course fees
4. **Create student portal** to track enrollment status
5. **Add batch management** for course scheduling

---

**Built with ❤️ for Skill2Hire Technologies**
