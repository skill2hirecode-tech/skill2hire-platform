import { Request, Response } from 'express';
import { uploadResumeToCloudinary, uploadImageToCloudinary } from '../utils/upload.service';

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      });
    }

    const resumeUrl = await uploadResumeToCloudinary(req.file);

    res.json({
      status: 'success',
      data: { url: resumeUrl },
      message: 'Resume uploaded successfully',
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload resume',
    });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      });
    }

    const imageUrl = await uploadImageToCloudinary(req.file);

    res.json({
      status: 'success',
      data: { url: imageUrl },
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image',
    });
  }
};
