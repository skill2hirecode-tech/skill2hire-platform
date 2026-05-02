import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File filter for resume uploads
const resumeFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
  }
};

// File filter for image uploads
const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
  }
};

// Multer configuration for resume uploads
export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter: resumeFileFilter,
});

// Multer configuration for image uploads
export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB for images
  },
  fileFilter: imageFileFilter,
});

// Upload resume to Cloudinary or save locally
export const uploadResumeToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  // Check if Cloudinary is configured
  const isCloudinaryConfigured = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET;

  if (isCloudinaryConfigured) {
    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'skill2hire/resumes',
          resource_type: 'raw',
          public_id: `resume_${Date.now()}_${file.originalname}`,
          use_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!.secure_url);
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  } else {
    // Save locally as fallback
    const fs = require('fs');
    const uploadsDir = path.join(__dirname, '../../uploads/resumes');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `resume_${Date.now()}_${file.originalname}`;
    const filepath = path.join(uploadsDir, filename);
    
    // Write file
    fs.writeFileSync(filepath, file.buffer);
    
    // Return local URL
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    return `${baseUrl}/uploads/resumes/${filename}`;
  }
};

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'skill2hire/images',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (url: string): string => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  return publicId;
};

// Generate unique filename
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  return `${nameWithoutExt}_${timestamp}_${randomString}${ext}`;
};

// Validate file size
export const validateFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  return path.extname(filename).toLowerCase();
};

// Check if file is PDF
export const isPDF = (filename: string): boolean => {
  return getFileExtension(filename) === '.pdf';
};

// Check if file is Word document
export const isWordDocument = (filename: string): boolean => {
  const ext = getFileExtension(filename);
  return ext === '.doc' || ext === '.docx';
};
