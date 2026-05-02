import { Router } from 'express';
import { uploadResume, uploadImage } from '../controllers/upload.controller';
import { resumeUpload, imageUpload } from '../utils/upload.service';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/upload/resume
// @desc    Upload resume file
// @access  Public (used in job application form)
router.post('/resume', resumeUpload.single('resume'), uploadResume);

// @route   POST /api/upload/image
// @desc    Upload image file
// @access  Private (Admin only)
router.post(
  '/image',
  authenticateToken,
  requireAdmin,
  imageUpload.single('image'),
  uploadImage
);

export default router;
