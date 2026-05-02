import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllJobs,
  getJobById,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplications,
} from '../controllers/job.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { resumeUpload } from '../utils/upload.service';

const router = Router();

// Public routes
// @route   GET /api/jobs
// @desc    Get all active jobs
// @access  Public
router.get('/', getAllJobs);

// @route   GET /api/jobs/slug/:slug
// @desc    Get job by slug
// @access  Public
router.get('/slug/:slug', getJobBySlug);

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', getJobById);

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job
// @access  Public
router.post(
  '/:id/apply',
  resumeUpload.single('resume'),
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  ],
  applyForJob
);

// Admin routes
// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Admin)
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  [
    body('title').notEmpty().withMessage('Job title is required'),
    body('description').notEmpty().withMessage('Job description is required'),
    body('requirements').notEmpty().withMessage('Job requirements are required'),
    body('responsibilities').notEmpty().withMessage('Job responsibilities are required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('jobType').isIn(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']).withMessage('Invalid job type'),
    body('experienceLevel').isIn(['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL', 'LEAD', 'EXECUTIVE']).withMessage('Invalid experience level'),
  ],
  createJob
);

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Admin)
router.put('/:id', authenticateToken, requireAdmin, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Admin)
router.delete('/:id', authenticateToken, requireAdmin, deleteJob);

// @route   GET /api/jobs/:id/applications
// @desc    Get all applications for a job
// @access  Private (Admin)
router.get('/:id/applications', authenticateToken, requireAdmin, getJobApplications);

export default router;
