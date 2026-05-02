import { Router } from 'express';
import { body } from 'express-validator';
import {
  login,
  register,
  getCurrentUser,
  changePassword,
} from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// @route   POST /api/auth/register
// @desc    Register new admin (protected - only super admin can create)
// @access  Private (Super Admin)
router.post(
  '/register',
  authenticateToken,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  register
);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', authenticateToken, getCurrentUser);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put(
  '/change-password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters'),
  ],
  changePassword
);

export default router;
