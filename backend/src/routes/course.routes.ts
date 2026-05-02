import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getCourseEnrollments,
} from '../controllers/course.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
// @route   GET /api/courses
// @desc    Get all active courses
// @access  Public
router.get('/', getAllCourses);

// @route   GET /api/courses/slug/:slug
// @desc    Get course by slug
// @access  Public
router.get('/slug/:slug', getCourseBySlug);

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', getCourseById);

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Public
router.post(
  '/:id/enroll',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  enrollInCourse
);

// Admin routes
// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Admin)
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  [
    body('title').notEmpty().withMessage('Course title is required'),
    body('description').notEmpty().withMessage('Course description is required'),
    body('overview').notEmpty().withMessage('Course overview is required'),
    body('curriculum').notEmpty().withMessage('Course curriculum is required'),
    body('duration').notEmpty().withMessage('Course duration is required'),
    body('level').isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).withMessage('Invalid course level'),
    body('price').isInt({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createCourse
);

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private (Admin)
router.put('/:id', authenticateToken, requireAdmin, updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private (Admin)
router.delete('/:id', authenticateToken, requireAdmin, deleteCourse);

// @route   GET /api/courses/:id/enrollments
// @desc    Get all enrollments for a course
// @access  Private (Admin)
router.get('/:id/enrollments', authenticateToken, requireAdmin, getCourseEnrollments);

export default router;
