import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { uploadResumeToCloudinary } from '../utils/upload.service';
import { sendJobApplicationEmail, sendWelcomeEmail } from '../utils/email.service';

const prisma = new PrismaClient();

// Helper function to generate slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// @desc    Get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      jobType,
      experienceLevel,
      location,
      search,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isActive: true };

    if (jobType) where.jobType = jobType;
    if (experienceLevel) where.experienceLevel = experienceLevel;
    if (location) where.location = { contains: location as string, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          location: true,
          jobType: true,
          experienceLevel: true,
          salaryMin: true,
          salaryMax: true,
          salaryCurrency: true,
          department: true,
          skills: true,
          createdAt: true,
        },
      }),
      prisma.job.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: {
        jobs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch jobs',
    });
  }
};

// @desc    Get job by ID
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    res.json({
      status: 'success',
      data: { job },
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch job',
    });
  }
};

// @desc    Get job by slug
export const getJobBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const job = await prisma.job.findUnique({
      where: { slug },
    });

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    res.json({
      status: 'success',
      data: { job },
    });
  } catch (error) {
    console.error('Get job by slug error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch job',
    });
  }
};

// @desc    Create new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      requirements,
      responsibilities,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      department,
      skills,
      benefits,
      expiresAt,
    } = req.body;

    const slug = generateSlug(title);

    const job = await prisma.job.create({
      data: {
        title,
        slug,
        description,
        requirements,
        responsibilities,
        location,
        jobType,
        experienceLevel,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        department,
        skills: skills || [],
        benefits: benefits || [],
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { job },
      message: 'Job created successfully',
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create job',
    });
  }
};

// @desc    Update job
export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    const updateData: any = { ...req.body };
    if (req.body.title && req.body.title !== job.title) {
      updateData.slug = generateSlug(req.body.title);
    }
    if (req.body.salaryMin) updateData.salaryMin = parseInt(req.body.salaryMin);
    if (req.body.salaryMax) updateData.salaryMax = parseInt(req.body.salaryMax);
    if (req.body.expiresAt) updateData.expiresAt = new Date(req.body.expiresAt);

    const updatedJob = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    res.json({
      status: 'success',
      data: { job: updatedJob },
      message: 'Job updated successfully',
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update job',
    });
  }
};

// @desc    Delete job
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    await prisma.job.delete({ where: { id } });

    res.json({
      status: 'success',
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete job',
    });
  }
};

// @desc    Apply for job
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const {
      fullName,
      email,
      phone,
      coverLetter,
      experience,
      currentCTC,
      expectedCTC,
      currentCompany,
      expectedSalary,
      noticePeriod,
      linkedinUrl,
      portfolioUrl,
    } = req.body;

    // Support both old and new field names
    const currentCtc = currentCTC || currentCompany;
    const expectedCtc = expectedCTC || expectedSalary;

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        status: 'error',
        message: 'This job is no longer accepting applications',
      });
    }

    // Check if resume file is uploaded
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume file is required',
      });
    }

    // Upload resume to Cloudinary
    const resumeUrl = await uploadResumeToCloudinary(req.file);

    // Create job application
    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        fullName,
        email,
        phone,
        resumeUrl,
        coverLetter,
        experience: experience ? parseInt(experience.toString()) : null,
        currentCTC: currentCtc,
        expectedCTC: expectedCtc,
        noticePeriod,
        linkedinUrl,
        portfolioUrl,
      },
    });

    // Send email notifications
    try {
      await Promise.all([
        sendJobApplicationEmail({
          jobTitle: job.title,
          applicantName: fullName,
          applicantEmail: email,
          resumeUrl,
        }),
        sendWelcomeEmail({
          name: fullName,
          email,
        }),
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the application if email fails
    }

    res.status(201).json({
      status: 'success',
      data: { application },
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit application',
    });
  }
};

// @desc    Get job applications
export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '20', status } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { jobId: id };
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          job: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      }),
      prisma.jobApplication.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: {
        applications,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch applications',
    });
  }
};
