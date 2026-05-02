# 👨‍💻 Skill2Hire Platform - Developer Onboarding Guide

## 🎯 Welcome!

This guide will help you get started with the Skill2Hire platform development. Follow these steps to set up your development environment and start contributing.

---

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## ✅ Prerequisites

### Required Software
| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | 18.x or higher | https://nodejs.org/ |
| npm | 9.x or higher | Comes with Node.js |
| Git | Latest | https://git-scm.com/ |
| VS Code | Latest (Recommended) | https://code.visualstudio.com/ |

### Recommended VS Code Extensions
```
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- TypeScript and JavaScript Language Features
- GitLens
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd skill2hire-platform
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npm run prisma:seed

# Start the development server
npm run dev
```

The backend will be running at: **http://localhost:5000**

### 3. Frontend Setup
Open a new terminal:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment variables
copy .env.example .env.local  # Windows
# OR
cp .env.example .env.local    # Mac/Linux

# Start the development server
npm run dev
```

The frontend will be running at: **http://localhost:3000**

### 4. Verify Installation
1. Open browser: http://localhost:3000
2. You should see the homepage
3. Check backend health: http://localhost:5000/health

---

## 🔄 Development Workflow

### Daily Workflow
```bash
# 1. Pull latest changes
git pull origin main

# 2. Create a new branch for your feature
git checkout -b feature/your-feature-name

# 3. Make your changes

# 4. Test your changes
npm run dev  # In both frontend and backend

# 5. Commit your changes
git add .
git commit -m "feat: add your feature description"

# 6. Push to remote
git push origin feature/your-feature-name

# 7. Create a Pull Request
```

### Commit Message Convention
Follow the Conventional Commits specification:

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting)
refactor: Code refactoring
test: Adding tests
chore: Maintenance tasks
```

Examples:
```bash
git commit -m "feat: add job search functionality"
git commit -m "fix: resolve salary display issue"
git commit -m "docs: update API documentation"
```

---

## 📝 Code Standards

### TypeScript
- **Always use TypeScript** for new files
- Define interfaces for all data structures
- Avoid `any` type - use proper typing

```typescript
// ✅ Good
interface Job {
  id: string;
  title: string;
  salary: number;
}

// ❌ Bad
const job: any = {...}
```

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

```typescript
// ✅ Good
export default function JobCard({ job }: { job: Job }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div onMouseEnter={() => setIsHovered(true)}>
      {job.title}
    </div>
  );
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use custom classes for repeated patterns

```tsx
// ✅ Good
<div className="card hover:shadow-lg transition-shadow">

// ❌ Bad - inline styles
<div style={{ padding: '20px', boxShadow: '0 2px 4px' }}>
```

### API Endpoints
- Use RESTful conventions
- Return consistent response format
- Handle errors properly

```typescript
// ✅ Good
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany();
    res.json({
      status: 'success',
      data: { jobs }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch jobs'
    });
  }
};
```

---

## 🛠️ Common Tasks

### Adding a New Page

#### Frontend
```bash
# Create new page file
cd frontend/src/app
mkdir new-page
touch new-page/page.tsx
```

```typescript
// new-page/page.tsx
'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NewPage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>New Page</h1>
      </main>
      <Footer />
    </>
  );
}
```

### Adding a New API Endpoint

#### Backend
```typescript
// 1. Create route (backend/src/routes/feature.routes.ts)
import express from 'express';
import { getFeatures } from '../controllers/feature.controller';

const router = express.Router();
router.get('/', getFeatures);

export default router;

// 2. Create controller (backend/src/controllers/feature.controller.ts)
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFeatures = async (req: Request, res: Response) => {
  try {
    const features = await prisma.feature.findMany();
    res.json({ status: 'success', data: { features } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed' });
  }
};

// 3. Register route (backend/src/server.ts)
import featureRoutes from './routes/feature.routes';
app.use('/api/features', featureRoutes);
```

### Adding a Database Table

```bash
# 1. Update schema (backend/prisma/schema.prisma)
model Feature {
  id          String   @id @default(cuid())
  name        String
  description String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("features")
}

# 2. Create migration
npx prisma migrate dev --name add_feature_table

# 3. Generate Prisma client
npx prisma generate
```

### Adding a New Component

```typescript
// frontend/src/components/shared/NewComponent.tsx
'use client';

import { useState } from 'react';

interface NewComponentProps {
  title: string;
  onAction?: () => void;
}

export default function NewComponent({ title, onAction }: NewComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={onAction} className="btn btn-primary">
        Action
      </button>
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

#### 2. Prisma Client Not Generated
```bash
cd backend
npx prisma generate
```

#### 3. Database Migration Issues
```bash
# Reset database (WARNING: Deletes all data)
cd backend
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix_issue
```

#### 4. Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. TypeScript Errors
```bash
# Check TypeScript errors
npm run type-check

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## 🎯 Best Practices

### 1. State Management
```typescript
// ✅ Use React Query for server state
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['jobs'],
  queryFn: () => jobsApi.getAll()
});

// ✅ Use useState for local UI state
const [isOpen, setIsOpen] = useState(false);
```

### 2. Error Handling
```typescript
// ✅ Always handle errors
try {
  const result = await api.call();
  toast.success('Success!');
} catch (error) {
  console.error('Error:', error);
  toast.error('Something went wrong');
}
```

### 3. Loading States
```typescript
// ✅ Show loading indicators
if (loading) {
  return <Loader />;
}

if (error) {
  return <ErrorMessage />;
}

return <Content data={data} />;
```

### 4. Accessibility
```typescript
// ✅ Use semantic HTML
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>

// ✅ Add alt text to images
<img src={url} alt="Job posting for Software Engineer" />
```

### 5. Performance
```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// ✅ Debounce search inputs
const debouncedSearch = useDebounce(searchTerm, 500);
```

---

## 📚 Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Docs](https://expressjs.com/)

### Tutorials
- [Next.js Tutorial](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)

---

## 🔍 Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows TypeScript best practices
- [ ] All TypeScript errors resolved
- [ ] Components are properly typed
- [ ] API endpoints return consistent format
- [ ] Error handling is implemented
- [ ] Loading states are shown
- [ ] Responsive design works on mobile
- [ ] No console errors in browser
- [ ] Database migrations are included
- [ ] Environment variables are documented
- [ ] Code is commented where necessary
- [ ] Commit messages follow convention

---

## 🎨 Design System

### Colors
```typescript
// Tailwind config colors
primary: '#1E6DCC'      // Primary Blue
secondary: '#28A745'    // Secondary Green
navy: '#0D2B45'         // Navy
```

### Typography
```css
/* Font Family */
font-family: 'Poppins', sans-serif;

/* Font Weights */
font-weight: 300, 400, 500, 600, 700, 800
```

### Spacing
```
4px  = 1 unit
8px  = 2 units
16px = 4 units
24px = 6 units
32px = 8 units
```

### Components
```typescript
// Button variants
btn btn-primary      // Primary action
btn btn-secondary    // Secondary action
btn btn-outline      // Outlined button

// Card
card                 // Standard card with shadow

// Input
input                // Form input field
label                // Form label
```

---

## 📞 Getting Help

### Internal Resources
- **Architecture Docs**: See `ARCHITECTURE.md`
- **Running Guide**: See `RUNNING.md`
- **README**: See `README.md`

### Team Communication
- **Questions**: Ask in team chat
- **Bugs**: Create an issue in the repository
- **Features**: Discuss in team meetings

### External Resources
- **Stack Overflow**: For general programming questions
- **GitHub Issues**: For library-specific issues
- **Documentation**: Always check official docs first

---

## 🎓 Onboarding Checklist

### Week 1
- [ ] Set up development environment
- [ ] Clone repository and run locally
- [ ] Read all documentation
- [ ] Understand project structure
- [ ] Make first small contribution (fix typo, update docs)

### Week 2
- [ ] Understand database schema
- [ ] Learn API endpoints
- [ ] Build a simple feature
- [ ] Review existing code
- [ ] Participate in code review

### Week 3
- [ ] Work on assigned tasks
- [ ] Implement a new feature
- [ ] Write tests
- [ ] Deploy to staging

### Week 4
- [ ] Independent feature development
- [ ] Help other team members
- [ ] Contribute to documentation
- [ ] Suggest improvements

---

## 🚀 Next Steps

1. **Set up your environment** following the Quick Start guide
2. **Read the Architecture documentation** to understand the system
3. **Pick a small task** from the backlog to get started
4. **Ask questions** - no question is too small!
5. **Have fun coding!** 🎉

---

**Welcome to the team!** 👋

If you have any questions, don't hesitate to reach out to your team lead or senior developers.

---

**Last Updated**: May 2, 2026  
**Version**: 1.0.0  
**Maintained By**: Skill2Hire Technologies Team
