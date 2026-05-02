import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { Resend } from 'resend';

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'onboarding@resend.dev';

  try {
    // Try Resend first if available (most reliable)
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: from.includes('@resend.dev') ? from : `Skill2Hire <${from}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      
      if (error) {
        console.error('Resend error:', error);
        throw error;
      }
      
      console.log(`✅ Email sent to ${options.to} via Resend (ID: ${data?.id})`);
      return;
    }
    
    // Try SendGrid if available
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      console.log(`✅ Email sent to ${options.to} via SendGrid`);
      return;
    }
    
    // Fallback to Nodemailer SMTP
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log(`✅ Email sent to ${options.to} via SMTP`);
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
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

export const sendJobApplicationConfirmation = async (data: {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
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
        .success-badge { background: #28A745; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin: 15px 0; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #1E6DCC; }
        .button { display: inline-block; padding: 12px 24px; background: #1E6DCC; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Application Received!</h1>
        </div>
        <div class="content">
          <div class="success-badge">🎉 Successfully Submitted</div>
          <h2>Hello ${data.applicantName},</h2>
          <p>Thank you for applying to <strong>${data.jobTitle}</strong> at Skill2Hire Technologies!</p>
          
          <div class="info-box">
            <h3>📋 What Happens Next?</h3>
            <ol>
              <li><strong>Application Review:</strong> Our HR team will carefully review your application and resume.</li>
              <li><strong>Initial Screening:</strong> Shortlisted candidates will be contacted within 3-5 business days.</li>
              <li><strong>Interview Process:</strong> If selected, we'll schedule interviews and assessments.</li>
              <li><strong>Final Decision:</strong> We'll keep you updated throughout the process.</li>
            </ol>
          </div>

          <div class="info-box">
            <h3>💡 In the Meantime</h3>
            <ul>
              <li>Keep your phone and email accessible</li>
              <li>Check your spam folder for our emails</li>
              <li>Explore other opportunities on our website</li>
              <li>Connect with us on LinkedIn</li>
            </ul>
          </div>

          <p><strong>Application Details:</strong></p>
          <ul>
            <li><strong>Position:</strong> ${data.jobTitle}</li>
            <li><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</li>
            <li><strong>Status:</strong> Under Review</li>
          </ul>

          <p style="margin-top: 25px;">We appreciate your interest in joining our team. If you have any questions, feel free to reach out!</p>
          
          <a href="${process.env.FRONTEND_URL}/jobs" class="button">View More Jobs</a>
        </div>
        <div class="footer">
          <p><strong>Skill2Hire Technologies</strong></p>
          <p>Connecting Talent with Opportunity</p>
          <p>📧 skill2hirecode@gmail.com | 📱 +91 82203 33917</p>
          <p style="margin-top: 10px; font-size: 11px;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: data.applicantEmail,
    subject: `Application Received: ${data.jobTitle} - Skill2Hire Technologies`,
    html,
    text: `Dear ${data.applicantName}, Thank you for applying to ${data.jobTitle} at Skill2Hire Technologies. We have received your application and will review it shortly. We'll contact you within 3-5 business days if you're shortlisted. Best regards, Skill2Hire Technologies Team`,
  });
};

export const sendCourseEnrollmentConfirmation = async (data: {
  courseTitle: string;
  studentName: string;
  studentEmail: string;
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
        .success-badge { background: #28A745; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin: 15px 0; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #28A745; }
        .button { display: inline-block; padding: 12px 24px; background: #1E6DCC; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Enrollment Confirmed!</h1>
        </div>
        <div class="content">
          <div class="success-badge">✅ Successfully Enrolled</div>
          <h2>Hello ${data.studentName},</h2>
          <p>Congratulations! You have successfully enrolled in <strong>${data.courseTitle}</strong> at Skill2Hire Technologies!</p>
          
          <div class="info-box">
            <h3>📚 What's Next?</h3>
            <ol>
              <li><strong>Enrollment Confirmation:</strong> Our team will review your enrollment details.</li>
              <li><strong>Course Details:</strong> You'll receive course materials and schedule within 2-3 business days.</li>
              <li><strong>Payment Information:</strong> We'll send you payment details and options shortly.</li>
              <li><strong>Batch Assignment:</strong> You'll be assigned to your preferred batch or the next available one.</li>
              <li><strong>Welcome Session:</strong> Details about orientation and first class will be shared soon.</li>
            </ol>
          </div>

          <div class="info-box">
            <h3>💡 Prepare for Success</h3>
            <ul>
              <li>Keep your email and phone accessible for updates</li>
              <li>Check your spam folder for our communications</li>
              <li>Join our WhatsApp group (link will be shared)</li>
              <li>Prepare any prerequisites mentioned in course description</li>
              <li>Set up your learning environment (laptop, internet, etc.)</li>
            </ul>
          </div>

          <p><strong>Enrollment Details:</strong></p>
          <ul>
            <li><strong>Course:</strong> ${data.courseTitle}</li>
            <li><strong>Enrolled On:</strong> ${new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</li>
            <li><strong>Status:</strong> Confirmed - Pending Batch Assignment</li>
          </ul>

          <div class="info-box">
            <h3>📞 Need Help?</h3>
            <p>If you have any questions about the course, schedule, or payment:</p>
            <ul>
              <li>📧 Email: skill2hirecode@gmail.com</li>
              <li>📱 WhatsApp: +91 82203 33917</li>
              <li>🌐 Visit our website for FAQs</li>
            </ul>
          </div>

          <p style="margin-top: 25px;">We're excited to have you join us on this learning journey. Get ready to upskill and advance your career!</p>
          
          <a href="${process.env.FRONTEND_URL}/courses" class="button">Explore More Courses</a>
        </div>
        <div class="footer">
          <p><strong>Skill2Hire Technologies</strong></p>
          <p>Connecting Talent with Opportunity</p>
          <p>📧 skill2hirecode@gmail.com | 📱 +91 82203 33917</p>
          <p style="margin-top: 10px; font-size: 11px;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: data.studentEmail,
    subject: `Enrollment Confirmed: ${data.courseTitle} - Skill2Hire Technologies`,
    html,
    text: `Dear ${data.studentName}, Congratulations! You have successfully enrolled in ${data.courseTitle} at Skill2Hire Technologies. Our team will contact you within 2-3 business days with course details, schedule, and payment information. We're excited to have you join us! Best regards, Skill2Hire Technologies Team`,
  });
};
