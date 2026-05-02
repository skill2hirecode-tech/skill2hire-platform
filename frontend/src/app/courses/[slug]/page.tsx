'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Clock, Users, Star, Award, BookOpen, CheckCircle, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  curriculum: string;
  duration: string;
  level: string;
  price: number;
  discountPrice: number | null;
  currency: string;
  category: string;
  tags: string[];
  skills: string[];
  prerequisites: string;
  instructor: string | null;
  thumbnail: string | null;
  rating: number | null;
  studentsEnrolled: number;
  maxStudents: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const coursesDataOld: any = {
  'servicenow': {
    id: '1',
    title: 'ServiceNow',
    description: 'Learn ServiceNow platform fundamentals, workflow automation, and IT service management.',
    fullDescription: 'Master the ServiceNow platform with comprehensive training covering ITSM, workflow automation, service catalog, and platform administration. Perfect for aspiring ServiceNow administrators and developers.',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 25000,
    discountPrice: 20000,
    category: 'IT Service Management',
    students: 156,
    rating: 4.8,
    skills: ['ServiceNow Platform', 'ITSM', 'Workflow Automation', 'Service Catalog', 'Platform Administration'],
    prerequisites: 'Basic IT knowledge',
    color: 'bg-green-500',
    curriculum: [
      'ServiceNow Platform Overview',
      'IT Service Management (ITSM) Fundamentals',
      'Incident & Problem Management',
      'Change & Release Management',
      'Service Catalog Development',
      'Workflow Automation',
      'Platform Administration',
      'Reporting & Analytics',
    ],
  },
  'testing-with-ai': {
    id: '2',
    title: 'Testing with AI',
    description: 'Learn modern software testing using AI tools, automation frameworks, and intelligent QA techniques.',
    fullDescription: 'Explore cutting-edge AI-powered testing methodologies, automation frameworks, and intelligent quality assurance techniques. Learn to leverage AI tools for test generation, execution, and analysis.',
    duration: '10 weeks',
    level: 'Advanced',
    price: 30000,
    discountPrice: 24000,
    category: 'Software Testing',
    students: 203,
    rating: 4.9,
    skills: ['AI Testing Tools', 'Test Automation', 'Selenium', 'Machine Learning for QA', 'Intelligent Test Generation'],
    prerequisites: 'Basic programming and testing knowledge',
    color: 'bg-purple-500',
    curriculum: [
      'Introduction to AI in Testing',
      'Test Automation Fundamentals',
      'Selenium WebDriver Advanced',
      'AI-Powered Test Generation',
      'Machine Learning for QA',
      'Intelligent Test Data Management',
      'Visual Testing with AI',
      'Performance Testing with AI Tools',
      'CI/CD Integration',
      'Real-world Projects',
    ],
  },
  'dotnet-development': {
    id: '3',
    title: '.NET Development',
    description: 'Build applications using C#, .NET framework, and web technologies.',
    fullDescription: 'Comprehensive .NET development training covering C#, ASP.NET Core, Entity Framework, and modern web development practices. Build scalable enterprise applications with industry best practices.',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 28000,
    discountPrice: 22000,
    category: 'Web Development',
    students: 287,
    rating: 4.7,
    skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'Web API', 'SQL Server'],
    prerequisites: 'Basic programming knowledge',
    color: 'bg-blue-500',
    curriculum: [
      'C# Programming Fundamentals',
      'Object-Oriented Programming',
      'ASP.NET Core MVC',
      'Entity Framework Core',
      'RESTful Web API Development',
      'Authentication & Authorization',
      'SQL Server & Database Design',
      'Front-end Integration',
      'Deployment & DevOps',
      'Capstone Project',
    ],
  },
  'vlsi-embedded-systems': {
    id: '4',
    title: 'VLSI & Embedded Systems',
    description: 'Learn chip design, embedded programming, and hardware systems development.',
    fullDescription: 'Deep dive into VLSI design, embedded systems programming, and hardware development. Learn chip design, RTL coding, embedded C/C++, and microcontroller programming for real-world applications.',
    duration: '14 weeks',
    level: 'Advanced',
    price: 35000,
    discountPrice: 28000,
    category: 'Hardware & Embedded',
    students: 124,
    rating: 4.8,
    skills: ['VLSI Design', 'Verilog/VHDL', 'Embedded C', 'Microcontrollers', 'FPGA Programming'],
    prerequisites: 'Electronics fundamentals',
    color: 'bg-orange-500',
    curriculum: [
      'Digital Electronics Fundamentals',
      'VLSI Design Flow',
      'Verilog HDL Programming',
      'VHDL Programming',
      'RTL Design & Synthesis',
      'Embedded C Programming',
      'Microcontroller Architecture',
      'ARM Cortex Programming',
      'FPGA Design & Implementation',
      'Real-time Operating Systems',
      'Hardware-Software Co-design',
      'Industry Project',
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/courses/slug/${slug}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setCourse(data.data.course);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy mb-4">Course Not Found</h1>
            <a href="/courses" className="btn btn-primary">
              Back to Courses
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const enrollmentUrl = `${apiUrl}/courses/${course.id}/enroll`;
      
      console.log('Submitting enrollment to:', enrollmentUrl);
      console.log('Form data:', formData);
      
      const response = await fetch(enrollmentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseId: course.id,
        }),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        toast.success('Enrollment request submitted successfully! We\'ll contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          education: '',
          message: '',
        });
      } else {
        console.error('Server error:', data);
        toast.error(data.message || 'Failed to submit enrollment. Please try again.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {course.overview || course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award size={20} className="mr-2" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2" />
                  <span>{course.studentsEnrolled || 0} students enrolled</span>
                </div>
                {course.rating && (
                  <div className="flex items-center">
                    <Star size={20} className="mr-2 fill-yellow-300 text-yellow-300" />
                    <span>{course.rating} rating</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Course Details */}
              <div className="lg:col-span-2">
                {/* What You'll Learn */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.skills.map((skill: string, idx: number) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="text-secondary mr-3 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">Course Curriculum</h2>
                  <div className="space-y-3">
                    {course.curriculum.split(',').map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">Prerequisites</h2>
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-primary">
                    <p className="text-gray-700">{course.prerequisites}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Enrollment Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Price Card */}
                  <div className="card mb-6">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-3 mb-2">
                        <span className="text-4xl font-bold text-primary">
                          ₹{((course.discountPrice || course.price) / 100).toLocaleString('en-IN')}
                        </span>
                        {course.discountPrice && course.discountPrice < course.price && (
                          <span className="text-xl text-gray-500 line-through">
                            ₹{(course.price / 100).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {course.discountPrice && course.discountPrice < course.price && (
                        <span className="text-green-600 font-medium">
                          Save ₹{((course.price - course.discountPrice) / 100).toLocaleString('en-IN')} ({Math.round(((course.price - course.discountPrice) / course.price) * 100)}% OFF)
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-medium">{course.studentsEnrolled || 0}+</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium flex items-center">
                          <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Form */}
                  <div className="card">
                    <h3 className="text-2xl font-bold text-navy mb-6">Enroll Now</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="label">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="label">Education</label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="input"
                          placeholder="B.Tech, MCA, etc."
                        />
                      </div>
                      <div>
                        <label className="label">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="input resize-none"
                          placeholder="Any questions or special requirements?"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t space-y-3">
                      <a href="tel:+918220333917" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                        <Phone size={18} className="mr-2" />
                        <span>+91 82203 33917</span>
                      </a>
                      <a href="mailto:info@skill2hiretechnologies.com" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                        <Mail size={18} className="mr-2" />
                        <span>info@skill2hiretechnologies.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
