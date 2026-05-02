import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllLeads,
  getLeadById,
  createContactLead,
  updateLeadStatus,
  deleteLead,
  subscribeNewsletter,
} from '../controllers/lead.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
// @route   POST /api/leads/contact
// @desc    Submit contact form
// @access  Public
router.post(
  '/contact',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  createContactLead
);

// @route   POST /api/leads/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post(
  '/newsletter',
  [body('email').isEmail().withMessage('Valid email is required')],
  subscribeNewsletter
);

// Admin routes
// @route   GET /api/leads
// @desc    Get all leads
// @access  Private (Admin)
router.get('/', authenticateToken, requireAdmin, getAllLeads);

// @route   GET /api/leads/:id
// @desc    Get lead by ID
// @access  Private (Admin)
router.get('/:id', authenticateToken, requireAdmin, getLeadById);

// @route   PUT /api/leads/:id/status
// @desc    Update lead status
// @access  Private (Admin)
router.put(
  '/:id/status',
  authenticateToken,
  requireAdmin,
  [
    body('status')
      .isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'])
      .withMessage('Invalid status'),
  ],
  updateLeadStatus
);

// @route   DELETE /api/leads/:id
// @desc    Delete a lead
// @access  Private (Admin)
router.delete('/:id', authenticateToken, requireAdmin, deleteLead);

export default router;
