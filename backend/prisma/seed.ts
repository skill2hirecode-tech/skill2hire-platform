import { PrismaClient, CourseLevel, JobType, ExperienceLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create courses
  const courses = [
    {
      id: '1',
      title: 'ServiceNow',
      slug: 'servicenow',
      description: 'Learn ServiceNow platform fundamentals, workflow automation, and IT service management.',
      overview: 'Master the ServiceNow platform with comprehensive training covering ITSM, workflow automation, service catalog, and platform administration.',
      curriculum: 'ServiceNow Platform Overview, IT Service Management (ITSM) Fundamentals, Incident & Problem Management, Change & Release Management, Service Catalog Development, Workflow Automation, Platform Administration, Reporting & Analytics',
      duration: '8 weeks',
      level: CourseLevel.INTERMEDIATE,
      price: 2500000,
      discountPrice: 2000000,
      currency: 'INR',
      category: 'IT Service Management',
      tags: ['ServiceNow', 'ITSM', 'IT Management'],
      skills: ['ServiceNow Platform', 'ITSM', 'Workflow Automation', 'Service Catalog', 'Platform Administration'],
      prerequisites: 'Basic IT knowledge',
      isActive: true,
    },
    {
      id: '2',
      title: 'Testing with AI',
      slug: 'testing-with-ai',
      description: 'Learn modern software testing using AI tools, automation frameworks, and intelligent QA techniques.',
      overview: 'Explore cutting-edge AI-powered testing methodologies, automation frameworks, and intelligent quality assurance techniques.',
      curriculum: 'Introduction to AI in Testing, Test Automation Fundamentals, Selenium WebDriver Advanced, AI-Powered Test Generation, Machine Learning for QA, Intelligent Test Data Management, Visual Testing with AI, Performance Testing with AI Tools, CI/CD Integration, Real-world Projects',
      duration: '10 weeks',
      level: CourseLevel.ADVANCED,
      price: 3000000,
      discountPrice: 2400000,
      currency: 'INR',
      category: 'Software Testing',
      tags: ['AI Testing', 'Automation', 'QA'],
      skills: ['AI Testing Tools', 'Test Automation', 'Selenium', 'Machine Learning for QA', 'Intelligent Test Generation'],
      prerequisites: 'Basic programming and testing knowledge',
      isActive: true,
    },
    {
      id: '3',
      title: '.NET Development',
      slug: 'dotnet-development',
      description: 'Build applications using C#, .NET framework, and web technologies.',
      overview: 'Comprehensive .NET development training covering C#, ASP.NET Core, Entity Framework, and modern web development practices.',
      curriculum: 'C# Programming Fundamentals, Object-Oriented Programming, ASP.NET Core MVC, Entity Framework Core, RESTful Web API Development, Authentication & Authorization, SQL Server & Database Design, Front-end Integration, Deployment & DevOps, Capstone Project',
      duration: '12 weeks',
      level: CourseLevel.INTERMEDIATE,
      price: 2800000,
      discountPrice: 2200000,
      currency: 'INR',
      category: 'Web Development',
      tags: ['.NET', 'C#', 'Web Development'],
      skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'Web API', 'SQL Server'],
      prerequisites: 'Basic programming knowledge',
      isActive: true,
    },
    {
      id: '4',
      title: 'VLSI & Embedded Systems',
      slug: 'vlsi-embedded-systems',
      description: 'Learn chip design, embedded programming, and hardware systems development.',
      overview: 'Deep dive into VLSI design, embedded systems programming, and hardware development.',
      curriculum: 'Digital Electronics Fundamentals, VLSI Design Flow, Verilog HDL Programming, VHDL Programming, RTL Design & Synthesis, Embedded C Programming, Microcontroller Architecture, ARM Cortex Programming, FPGA Design & Implementation, Real-time Operating Systems, Hardware-Software Co-design, Industry Project',
      duration: '14 weeks',
      level: CourseLevel.ADVANCED,
      price: 3500000,
      discountPrice: 2800000,
      currency: 'INR',
      category: 'Hardware & Embedded',
      tags: ['VLSI', 'Embedded Systems', 'Hardware'],
      skills: ['VLSI Design', 'Verilog/VHDL', 'Embedded C', 'Microcontrollers', 'FPGA Programming'],
      prerequisites: 'Electronics fundamentals',
      isActive: true,
    },
  ];

  // Delete existing courses
  await prisma.course.deleteMany({});
  console.log('🗑️  Cleared existing courses');

  // Create new courses
  for (const course of courses) {
    await prisma.course.create({ data: course });
    console.log(`✅ Created course: ${course.title}`);
  }

  // Create jobs
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      slug: 'senior-full-stack-developer',
      description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will work on cutting-edge web applications using modern technologies.',
      requirements: 'Strong experience with React, Node.js, TypeScript, and MongoDB. Experience with cloud platforms (AWS/Azure). Strong problem-solving skills and ability to work in an agile environment.',
      responsibilities: 'Design and develop scalable web applications, collaborate with cross-functional teams, mentor junior developers, participate in code reviews, and contribute to technical architecture decisions.',
      location: 'Bangalore, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 800000,
      salaryMax: 1200000,
      salaryCurrency: '₹',
      department: 'Engineering',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      benefits: ['Health Insurance', 'Work from Home', 'Learning Budget', 'Performance Bonus'],
      expiresAt: new Date('2026-06-30'),
      isActive: true,
    },
    {
      title: 'ServiceNow Developer',
      slug: 'servicenow-developer',
      description: 'Join our team as a ServiceNow Developer and work on enterprise-level ITSM implementations.',
      requirements: 'ServiceNow Certified System Administrator (CSA) required. Experience with ITSM, ITOM, or ITBM modules. Strong JavaScript and web technologies knowledge.',
      responsibilities: 'Develop and customize ServiceNow applications, implement workflows and business rules, integrate with third-party systems, and provide technical support.',
      location: 'Hyderabad, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 700000,
      salaryMax: 1000000,
      salaryCurrency: '₹',
      department: 'IT Services',
      skills: ['ServiceNow', 'ITSM', 'JavaScript', 'Workflow Automation', 'Integration'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Training & Certification', 'Annual Bonus'],
      expiresAt: new Date('2026-06-15'),
      isActive: true,
    },
    {
      title: 'QA Automation Engineer',
      slug: 'qa-automation-engineer',
      description: 'We are seeking a talented QA Automation Engineer to enhance our testing capabilities with AI-powered tools.',
      requirements: 'Strong experience with Selenium, TestNG, and Java/Python. Knowledge of AI testing tools and frameworks. Experience with CI/CD pipelines.',
      responsibilities: 'Design and implement automated test frameworks, develop AI-powered test scripts, perform regression testing, collaborate with development teams, and maintain test documentation.',
      location: 'Pune, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.ENTRY_LEVEL,
      salaryMin: 500000,
      salaryMax: 800000,
      salaryCurrency: '₹',
      department: 'Quality Assurance',
      skills: ['Selenium', 'Test Automation', 'Python', 'AI Testing', 'CI/CD'],
      benefits: ['Health Insurance', 'Remote Work', 'Skill Development', 'Team Outings'],
      expiresAt: new Date('2026-07-01'),
      isActive: true,
    },
    {
      title: 'Frontend Developer',
      slug: 'frontend-developer',
      description: 'Join our team to build beautiful, responsive web applications using React and modern frontend technologies.',
      requirements: 'Strong proficiency in React, JavaScript/TypeScript, HTML5, CSS3. Experience with state management (Redux/Context API). Knowledge of responsive design and cross-browser compatibility.',
      responsibilities: 'Develop user-facing features, optimize applications for speed and scalability, collaborate with designers and backend developers, write clean and maintainable code.',
      location: 'Mumbai, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.ENTRY_LEVEL,
      salaryMin: 600000,
      salaryMax: 900000,
      salaryCurrency: '₹',
      department: 'Engineering',
      skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Responsive Design'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Snacks & Beverages'],
      expiresAt: new Date('2026-06-20'),
      isActive: true,
    },
    {
      title: 'DevOps Engineer',
      slug: 'devops-engineer',
      description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
      requirements: 'Experience with AWS/Azure, Docker, Kubernetes. Strong knowledge of CI/CD tools (Jenkins, GitLab CI). Proficiency in scripting (Python, Bash). Understanding of infrastructure as code (Terraform, CloudFormation).',
      responsibilities: 'Manage cloud infrastructure, implement and maintain CI/CD pipelines, monitor system performance, automate deployment processes, ensure security best practices.',
      location: 'Bangalore, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 900000,
      salaryMax: 1400000,
      salaryCurrency: '₹',
      department: 'Infrastructure',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Python'],
      benefits: ['Health Insurance', 'Work from Home', 'Stock Options', 'Annual Bonus'],
      expiresAt: new Date('2026-07-15'),
      isActive: true,
    },
    {
      title: 'Data Scientist',
      slug: 'data-scientist',
      description: 'Seeking a Data Scientist to extract insights from large datasets and build predictive models.',
      requirements: 'Strong background in statistics and machine learning. Proficiency in Python (NumPy, Pandas, Scikit-learn). Experience with deep learning frameworks (TensorFlow, PyTorch). SQL expertise.',
      responsibilities: 'Analyze complex datasets, develop machine learning models, create data visualizations, collaborate with stakeholders, present findings to leadership.',
      location: 'Hyderabad, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID_LEVEL,
      salaryMin: 1000000,
      salaryMax: 1600000,
      salaryCurrency: '₹',
      department: 'Data Science',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'Data Visualization'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Conference Budget', 'Research Time'],
      isActive: true,
    },
    {
      title: 'Backend Developer - Node.js',
      slug: 'backend-developer-nodejs',
      description: 'We need a Backend Developer to build scalable APIs and microservices using Node.js.',
      requirements: 'Strong experience with Node.js and Express. Knowledge of databases (MongoDB, PostgreSQL). Understanding of RESTful APIs and microservices architecture. Experience with message queues (RabbitMQ, Kafka).',
      responsibilities: 'Design and develop backend services, optimize database queries, implement security measures, write unit and integration tests, participate in code reviews.',
      location: 'Chennai, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.ENTRY_LEVEL,
      salaryMin: 550000,
      salaryMax: 850000,
      salaryCurrency: '₹',
      department: 'Engineering',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'Microservices'],
      benefits: ['Health Insurance', 'Hybrid Work', 'Skill Development', 'Team Events'],
      isActive: true,
    },
    {
      title: 'UI/UX Designer',
      slug: 'ui-ux-designer',
      description: 'Creative UI/UX Designer needed to craft beautiful and intuitive user experiences.',
      requirements: 'Strong portfolio demonstrating UI/UX design skills. Proficiency in Figma, Adobe XD, or Sketch. Understanding of user-centered design principles. Experience with prototyping and user testing.',
      responsibilities: 'Create wireframes and prototypes, design user interfaces, conduct user research, collaborate with developers, maintain design systems.',
      location: 'Delhi, India',
      jobType: JobType.FULL_TIME,
      experienceLevel: ExperienceLevel.ENTRY_LEVEL,
      salaryMin: 500000,
      salaryMax: 750000,
      salaryCurrency: '₹',
      department: 'Design',
      skills: ['Figma', 'UI Design', 'UX Design', 'Prototyping', 'User Research', 'Design Systems'],
      benefits: ['Health Insurance', 'Creative Freedom', 'Design Tools Budget', 'Flexible Hours'],
      isActive: true,
    },
  ];

  // Delete existing jobs
  await prisma.job.deleteMany({});
  console.log('🗑️  Cleared existing jobs');

  // Create new jobs
  for (const job of jobs) {
    await prisma.job.create({ data: job });
    console.log(`✅ Created job: ${job.title}`);
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
