import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Create Nodemailer transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const from = process.env.FROM_EMAIL || 'noreply@skill2hiretechnologies.com';

  try {
    // Try SendGrid first if available
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      console.log(`Email sent to ${options.to} via SendGrid`);
    } else {
      // Fallback to Nodemailer
      await transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      console.log(`Email sent to ${options.to} via SMTP`);
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

// Email Templates

export const sendJobApplicationEmail = async (data: {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  resumeUrl: string;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'skill2hirecode@gmail.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E6DCC 0%, #28A745 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .footer { background: #0D2B45; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .button { display: inline-block; padding: 12px 24px; background: #1E6DCC; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #28A745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Job Application Received</h1>
        </div>
        <div class="content">
          <h2>Job Position: ${data.jobTitle}</h2>
          <div class="info-box">
            <p><strong>Applicant Name:</strong> ${data.applicantName}</p>
            <p><strong>Email:</strong> ${data.applicantEmail}</p>
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <p>A new candidate has applied for the <strong>${data.jobTitle}</strong> position.</p>
          <a href="${data.resumeUrl}" class="button">📄 Download Resume</a>
          <p style="margin-top: 20px;">Please review the application and contact the candidate if suitable.</p>
        </div>
        <div class="footer">
          <p>Skill2Hire Technologies - Connecting Talent with Opportunity</p>
          <p>This is an automated notification from your recruitment platform.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: adminEmail,
    subject: `New Application: ${data.jobTitle} - ${data.applicantName}`,
    html,
    text: `New job application received for ${data.jobTitle} from ${data.applicantName} (${data.applicantEmail})`,
  });
};

export const sendCourseEnrollmentEmail = async (data: {
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'skill2hirecode@gmail.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E6DCC 0%, #28A745 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .footer { background: #0D2B45; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #28A745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📚 New Course Enrollment</h1>
        </div>
        <div class="content">
          <h2>Course: ${data.courseTitle}</h2>
          <div class="info-box">
            <p><strong>Student Name:</strong> ${data.studentName}</p>
            <p><strong>Email:</strong> ${data.studentEmail}</p>
            <p><strong>Phone:</strong> ${data.studentPhone}</p>
            <p><strong>Enrollment Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <p>A new student has enrolled for the <strong>${data.courseTitle}</strong> course.</p>
          <p style="margin-top: 20px;">Please contact the student to confirm enrollment and provide further details.</p>
        </div>
        <div class="footer">
          <p>Skill2Hire Technologies - Connecting Talent with Opportunity</p>
          <p>This is an automated notification from your training platform.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: adminEmail,
    subject: `New Enrollment: ${data.courseTitle} - ${data.studentName}`,
    html,
    text: `New course enrollment for ${data.courseTitle} from ${data.studentName} (${data.studentEmail})`,
  });
};

export const sendContactLeadEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'skill2hirecode@gmail.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E6DCC 0%, #28A745 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .footer { background: #0D2B45; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #28A745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="info-box">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <h3>Message:</h3>
          <p style="background: white; padding: 15px; border-radius: 5px;">${data.message}</p>
        </div>
        <div class="footer">
          <p>Skill2Hire Technologies - Connecting Talent with Opportunity</p>
          <p>This is an automated notification from your contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${data.subject} - ${data.name}`,
    html,
    text: `Contact form submission from ${data.name} (${data.email}): ${data.message}`,
  });
};

export const sendWelcomeEmail = async (data: {
  name: string;
  email: string;
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E6DCC 0%, #28A745 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { background: #0D2B45; color: white; padding: 20px; text-align: center; }
        .button { display: inline-block; padding: 12px 24px; background: #28A745; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Skill2Hire Technologies!</h1>
        </div>
        <div class="content">
          <h2>Hello ${data.name},</h2>
          <p>Thank you for your interest in Skill2Hire Technologies!</p>
          <p>We're excited to help you on your journey to connect talent with opportunity. Our team will review your submission and get back to you shortly.</p>
          <p>In the meantime, feel free to explore:</p>
          <ul>
            <li>Our latest job openings</li>
            <li>Professional training courses</li>
            <li>Career resources and tips</li>
          </ul>
          <a href="${process.env.FRONTEND_URL}" class="button">Visit Our Website</a>
          <p style="margin-top: 20px;">If you have any questions, don't hesitate to reach out!</p>
        </div>
        <div class="footer">
          <p><strong>Skill2Hire Technologies</strong></p>
          <p>Connecting Talent with Opportunity</p>
          <p>📧 info@skill2hiretechnologies.com | 📱 +91 98765 43210</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: data.email,
    subject: 'Welcome to Skill2Hire Technologies!',
    html,
    text: `Welcome to Skill2Hire Technologies, ${data.name}! We'll be in touch soon.`,
  });
};
