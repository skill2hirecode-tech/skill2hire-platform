'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Clock, Users, Star, Award, BookOpen, TrendingUp, Filter, Search } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: '1',
    title: 'ServiceNow',
    slug: 'servicenow',
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
    image: '/courses/servicenow.jpg',
    color: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Testing with AI',
    slug: 'testing-with-ai',
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
    image: '/courses/ai-testing.jpg',
    color: 'bg-purple-500',
  },
  {
    id: '3',
    title: '.NET Development',
    slug: 'dotnet-development',
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
    image: '/courses/dotnet.jpg',
    color: 'bg-blue-500',
  },
  {
    id: '4',
    title: 'VLSI & Embedded Systems',
    slug: 'vlsi-embedded-systems',
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
    image: '/courses/vlsi.jpg',
    color: 'bg-orange-500',
  },
];

const categories = ['All Courses', 'IT Service Management', 'Software Testing', 'Web Development', 'Hardware & Embedded'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Training Courses
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Industry-relevant courses designed to make you job-ready
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">Filter by:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Level Filter */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="text-gray-600">
                <span className="font-medium">{filteredCourses.length}</span> courses found
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="card group cursor-pointer p-0 overflow-hidden hover:shadow-2xl transition-all">
                    {/* Course Header with Color */}
                    <div className={`h-48 ${course.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center p-6">
                          <h3 className="text-3xl font-bold mb-2">{course.title}</h3>
                          <p className="text-white/90">{course.category}</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white text-gray-900 text-xs font-medium rounded-full">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          {course.students} students
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="mr-1 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {course.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                          {course.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{course.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">₹{course.discountPrice.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through">₹{course.price.toLocaleString()}</span>
                          </div>
                          <span className="text-xs text-green-600 font-medium">
                            Save ₹{(course.price - course.discountPrice).toLocaleString()}
                          </span>
                        </div>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="btn btn-primary text-sm"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Our Courses */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title">Why Choose Our Courses?</h2>
              <p className="section-subtitle">
                Industry-leading training designed for career success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Industry Experts</h3>
                <p className="text-gray-600 text-sm">Learn from professionals with real-world experience</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-secondary" size={32} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Hands-On Projects</h3>
                <p className="text-gray-600 text-sm">Build real projects to strengthen your portfolio</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-purple-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Placement Support</h3>
                <p className="text-gray-600 text-sm">Get job assistance and interview preparation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-orange-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Career Growth</h3>
                <p className="text-gray-600 text-sm">95% of our students get placed within 6 months</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of successful students who transformed their careers with Skill2Hire
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
                  Get Free Counseling
                </a>
                <a href="tel:+918220333917" className="btn bg-secondary hover:bg-secondary-600 text-white px-8 py-4 text-lg">
                  Call Us Now
                </a>
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
