import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { sendContactLeadEmail } from '../utils/email.service';

const prisma = new PrismaClient();

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20', status, source } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) where.status = status;
    if (source) where.source = source;

    const [leads, total] = await Promise.all([
      prisma.contactLead.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactLead.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: {
        leads,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch leads' });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await prisma.contactLead.findUnique({ where: { id: req.params.id } });
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found' });
    }
    res.json({ status: 'success', data: { lead } });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch lead' });
  }
};

export const createContactLead = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { fullName, email, phone, subject, message } = req.body;

    const lead = await prisma.contactLead.create({
      data: {
        fullName,
        email,
        phone,
        subject: subject || 'General Inquiry',
        message,
        source: 'CONTACT_FORM',
      },
    });

    try {
      await sendContactLeadEmail({
        name: fullName,
        email,
        phone,
        subject: subject || 'General Inquiry',
        message,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      status: 'success',
      data: { lead },
      message: 'Your message has been sent successfully',
    });
  } catch (error) {
    console.error('Create contact lead error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to submit contact form' });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    const lead = await prisma.contactLead.findUnique({ where: { id } });
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found' });
    }

    const updatedLead = await prisma.contactLead.update({
      where: { id },
      data: { status },
    });

    res.json({
      status: 'success',
      data: { lead: updatedLead },
      message: 'Lead status updated successfully',
    });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update lead status' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lead = await prisma.contactLead.findUnique({ where: { id } });
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found' });
    }

    await prisma.contactLead.delete({ where: { id } });
    res.json({ status: 'success', message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete lead' });
  }
};

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { email } = req.body;

    const existingSubscription = await prisma.newsletter.findUnique({ where: { email } });
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          status: 'error',
          message: 'This email is already subscribed',
        });
      } else {
        await prisma.newsletter.update({
          where: { email },
          data: { isActive: true },
        });
        return res.json({
          status: 'success',
          message: 'Newsletter subscription reactivated',
        });
      }
    }

    await prisma.newsletter.create({ data: { email } });

    res.status(201).json({
      status: 'success',
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to subscribe to newsletter' });
  }
};
