'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Briefcase, MapPin, Clock, IndianRupee, Users, Search, Filter, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  slug: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  department: string | null;
  description: string;
  skills: string[];
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      console.log('Fetching jobs from:', `${apiUrl}/jobs?page=1&limit=50`);
      
      const response = await fetch(`${apiUrl}/jobs?page=1&limit=50`);
      const data = await response.json();
      
      console.log('Jobs API response:', data);
      
      if (data.status === 'success') {
        setJobs(data.data.jobs);
        console.log('Jobs loaded:', data.data.jobs.length);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.department?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.jobType === filterType;
    const matchesLocation = filterLocation === 'all' || job.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  const jobTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERNSHIP', label: 'Internship' },
    { value: 'FREELANCE', label: 'Freelance' },
  ];
  
  const locations = ['all', 'Bangalore', 'Hyderabad', 'Remote', 'Chennai', 'Pune'];

  const formatJobType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatSalary = (min: number | null, max: number | null, currency: string) => {
    if (!min || !max) return 'Competitive';
    const minLPA = (min / 100000).toFixed(1);
    const maxLPA = (max / 100000).toFixed(1);
    return `${minLPA}-${maxLPA} LPA`;
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Dream Job
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Explore exciting career opportunities with top companies
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs by title, department, or keyword..."
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
                {/* Job Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {/* Location Filter */}
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-gray-600">
                <span className="font-medium">{filteredJobs.length}</span> jobs found
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
                <button onClick={fetchJobs} className="btn btn-primary mt-4">
                  Refresh Jobs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="card hover:shadow-xl transition-all cursor-pointer border-l-4 border-primary">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left Side - Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link href={`/jobs/${job.slug}`}>
                              <h3 className="text-2xl font-bold text-navy hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                            </Link>
                            <p className="text-lg text-gray-600 mt-1">{job.department || 'Technology'}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            {formatJobType(job.jobType)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase size={16} className="mr-1" />
                            {formatJobType(job.experienceLevel)}
                          </div>
                          <div className="flex items-center">
                            <IndianRupee size={16} className="mr-1" />
                            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 5).map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Apply Button */}
                      <div className="md:text-right">
                        <Link href={`/jobs/${job.slug}`} className="btn btn-primary inline-block">
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-primary" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-navy mb-2">{jobs.length}+</h3>
                <p className="text-gray-600">Active Jobs</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-secondary" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-navy mb-2">15+</h3>
                <p className="text-gray-600">Companies</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-purple-600" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-navy mb-2">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-navy mb-2">24hrs</h3>
                <p className="text-gray-600">Avg Response Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Take the Next Step in Your Career?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Browse our latest job openings and apply today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/courses" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
                  Explore Courses
                </a>
                <a href="/contact" className="btn bg-secondary hover:bg-secondary-600 text-white px-8 py-4 text-lg">
                  Contact Us
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
