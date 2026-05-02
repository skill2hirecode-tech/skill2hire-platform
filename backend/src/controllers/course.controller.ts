import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { sendCourseEnrollmentEmail, sendWelcomeEmail } from '../utils/email.service';

const prisma = new PrismaClient();

const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', level, category, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isActive: true };
    if (level) where.level = level;
    if (category) where.category = { contains: category as string, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: {
        courses,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch courses' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: req.params.id } });
    if (!course) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }
    res.json({ status: 'success', data: { course } });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch course' });
  }
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { slug: req.params.slug } });
    if (!course) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }
    res.json({ status: 'success', data: { course } });
  } catch (error) {
    console.error('Get course by slug error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch course' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { title, ...rest } = req.body;
    const slug = generateSlug(title);

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        ...rest,
        price: parseInt(rest.price),
        discountPrice: rest.discountPrice ? parseInt(rest.discountPrice) : null,
        maxStudents: rest.maxStudents ? parseInt(rest.maxStudents) : null,
        startDate: rest.startDate ? new Date(rest.startDate) : null,
        endDate: rest.endDate ? new Date(rest.endDate) : null,
        tags: rest.tags || [],
        skills: rest.skills || [],
      },
    });

    res.status(201).json({
      status: 'success',
      data: { course },
      message: 'Course created successfully',
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to create course' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }

    const updateData: any = { ...req.body };
    if (req.body.title && req.body.title !== course.title) {
      updateData.slug = generateSlug(req.body.title);
    }
    if (req.body.price) updateData.price = parseInt(req.body.price);
    if (req.body.discountPrice) updateData.discountPrice = parseInt(req.body.discountPrice);
    if (req.body.maxStudents) updateData.maxStudents = parseInt(req.body.maxStudents);
    if (req.body.startDate) updateData.startDate = new Date(req.body.startDate);
    if (req.body.endDate) updateData.endDate = new Date(req.body.endDate);

    const updatedCourse = await prisma.course.update({ where: { id }, data: updateData });

    res.json({
      status: 'success',
      data: { course: updatedCourse },
      message: 'Course updated successfully',
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update course' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }

    await prisma.course.delete({ where: { id } });
    res.json({ status: 'success', message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete course' });
  }
};

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { id } = req.params;
    const { fullName, email, phone, education, currentStatus, message, preferredBatch } = req.body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ status: 'error', message: 'Course not found' });
    }

    if (!course.isActive) {
      return res.status(400).json({
        status: 'error',
        message: 'This course is not currently accepting enrollments',
      });
    }

    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: id,
        fullName,
        email,
        phone,
        education,
        currentStatus,
        message,
        preferredBatch,
      },
    });

    try {
      await Promise.all([
        sendCourseEnrollmentEmail({
          courseTitle: course.title,
          studentName: fullName,
          studentEmail: email,
          studentPhone: phone,
        }),
        sendWelcomeEmail({ name: fullName, email }),
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      status: 'success',
      data: { enrollment },
      message: 'Enrollment submitted successfully',
    });
  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to submit enrollment' });
  }
};

export const getCourseEnrollments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '20', status } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { courseId: id };
    if (status) where.status = status;

    const [enrollments, total] = await Promise.all([
      prisma.courseEnrollment.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: { course: { select: { title: true, slug: true } } },
      }),
      prisma.courseEnrollment.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: {
        enrollments,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get course enrollments error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch enrollments' });
  }
};
