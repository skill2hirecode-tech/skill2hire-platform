import { PrismaClient, JobType, ExperienceLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding jobs...');

  // Delete existing jobs
  await prisma.job.deleteMany({});
  console.log('🗑️  Cleared existing jobs');

  // Create sample jobs
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      slug: 'senior-full-stack-developer',
      location: 'Bangalore, Karnataka',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.SENIOR_LEVEL,
      salaryMin: 1500000,
      salaryMax: 2500000,
      salaryCurrency: 'INR',
      department: 'Engineering',
      description: `We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.

The ideal candidate should have strong experience in both frontend and backend development, with a passion for creating scalable and efficient solutions.`,
      responsibilities: `Design and develop scalable web applications
Write clean, maintainable code following best practices
Collaborate with cross-functional teams
Participate in code reviews and technical discussions
Mentor junior developers
Optimize application performance`,
      requirements: `5+ years of experience in full stack development
Strong proficiency in React, Node.js, and TypeScript
Experience with PostgreSQL or MongoDB
Knowledge of cloud platforms (AWS/Azure)
Excellent problem-solving skills
Good communication skills`,
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
      benefits: ['Health Insurance', 'Work from Home', 'Flexible Hours', 'Learning Budget', 'Performance Bonus'],
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    {
      title: 'ServiceNow Developer',
      slug: 'servicenow-developer',
      location: 'Hyderabad, Telangana',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 1000000,
      salaryMax: 1800000,
      department: 'IT Services',
      description: `Join our team as a ServiceNow Developer and work on exciting enterprise projects. You will be responsible for developing and customizing ServiceNow applications to meet business requirements.`,
      responsibilities: `Develop and customize ServiceNow applications
Configure workflows and business rules
Integrate ServiceNow with third-party systems
Provide technical support and troubleshooting
Document technical specifications
Train end users on ServiceNow functionality`,
      requirements: `3+ years of ServiceNow development experience
ServiceNow certification (CSA/CAD) preferred
Strong knowledge of JavaScript and AngularJS
Experience with ITSM, ITOM, or ITBM modules
Understanding of ITIL processes
Good analytical and problem-solving skills`,
      skills: ['ServiceNow', 'JavaScript', 'AngularJS', 'ITSM', 'ITIL', 'REST API'],
      benefits: ['Health Insurance', 'Provident Fund', 'Paid Time Off', 'Training & Certification'],
      isActive: true,
      expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'QA Automation Engineer',
      slug: 'qa-automation-engineer',
      location: 'Pune, Maharashtra',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 800000,
      salaryMax: 1200000,
      department: 'Quality Assurance',
      description: `We are seeking a skilled QA Automation Engineer to design and implement automated testing solutions. You will work closely with development teams to ensure high-quality software delivery.`,
      responsibilities: `Design and develop automated test scripts
Execute automated test suites
Identify and report bugs
Collaborate with developers to resolve issues
Maintain test automation framework
Participate in sprint planning and reviews`,
      requirements: `2+ years of experience in test automation
Proficiency in Selenium, Cypress, or similar tools
Knowledge of programming languages (Java/Python/JavaScript)
Experience with CI/CD tools (Jenkins, GitLab CI)
Understanding of Agile methodologies
Strong attention to detail`,
      skills: ['Selenium', 'Cypress', 'Java', 'Python', 'Jenkins', 'Git', 'API Testing'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Performance Bonus'],
      isActive: true,
      expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    },
    {
      title: '.NET Developer',
      slug: 'dotnet-developer',
      location: 'Chennai, Tamil Nadu',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 1200000,
      salaryMax: 2000000,
      department: 'Engineering',
      description: `Looking for an experienced .NET Developer to build enterprise-level applications. You will work on challenging projects using the latest .NET technologies.`,
      responsibilities: `Develop web applications using ASP.NET Core
Design and implement RESTful APIs
Write unit and integration tests
Optimize application performance
Collaborate with frontend developers
Follow coding standards and best practices`,
      requirements: `3+ years of experience in .NET development
Strong knowledge of C# and ASP.NET Core
Experience with Entity Framework Core
Understanding of SQL Server
Knowledge of design patterns
Excellent problem-solving abilities`,
      skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'Web API', 'Azure'],
      benefits: ['Health Insurance', 'Provident Fund', 'Work from Home', 'Annual Bonus'],
      isActive: true,
      expiresAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'VLSI Design Engineer',
      slug: 'vlsi-design-engineer',
      location: 'Bangalore, Karnataka',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 1000000,
      salaryMax: 1600000,
      department: 'Hardware',
      description: `Join our semiconductor design team as a VLSI Design Engineer. You will be involved in designing and verifying complex digital circuits for cutting-edge products.`,
      responsibilities: `Design and verify digital circuits
Write RTL code in Verilog/VHDL
Perform timing analysis and optimization
Collaborate with verification team
Document design specifications
Participate in design reviews`,
      requirements: `2+ years of experience in VLSI design
Strong knowledge of Verilog/VHDL
Experience with synthesis and timing tools
Understanding of digital design concepts
Knowledge of scripting (Perl/Python)
Good analytical skills`,
      skills: ['Verilog', 'VHDL', 'RTL Design', 'Synthesis', 'Timing Analysis', 'Python'],
      benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Flexible Hours'],
      isActive: true,
      expiresAt: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Data Science Intern',
      slug: 'data-science-intern',
      location: 'Remote',
      jobType: JobType.INTERNSHIP,
      experienceLevel: ExperienceLevel.ENTRY_LEVEL,
      salaryMin: 15000,
      salaryMax: 25000,
      department: 'Data Science',
      description: `Exciting internship opportunity for aspiring data scientists. Work on real-world machine learning projects and gain hands-on experience with cutting-edge AI technologies.`,
      responsibilities: `Assist in data collection and preprocessing
Build and train machine learning models
Analyze data and generate insights
Create visualizations and reports
Collaborate with senior data scientists
Learn and apply new techniques`,
      requirements: `Currently pursuing or completed degree in CS/IT/Statistics
Basic knowledge of Python and machine learning
Familiarity with libraries like pandas, numpy, scikit-learn
Understanding of statistics and probability
Eagerness to learn
Good communication skills`,
      skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'Data Visualization'],
      benefits: ['Certificate', 'Mentorship', 'Flexible Hours', 'Potential Full-time Offer'],
      isActive: true,
      expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
    console.log(`✅ Created job: ${job.title}`);
  }

  console.log('✅ Jobs seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding jobs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
