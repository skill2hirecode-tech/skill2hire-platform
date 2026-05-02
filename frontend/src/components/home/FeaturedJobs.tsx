'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { jobsApi } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  department: string;
  skills: string[];
  createdAt: string;
}

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobsApi.getAll({ page: 1, limit: 3 });
        setJobs(response.data.jobs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="inline-block mb-2">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full">Career Opportunities</span>
            </div>
            <h2 className="section-title bg-gradient-to-r from-navy to-primary bg-clip-text text-transparent">Featured Jobs</h2>
            <p className="section-subtitle">Explore the latest job opportunities and take the next step in your career</p>
          </div>
          <Link href="/jobs" className="btn btn-outline hidden md:flex group">
            View All Jobs
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">No jobs available at the moment.</p>
            <Link href="/jobs" className="btn btn-primary">
              Check Back Later
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const salary = job.salaryMin && job.salaryMax
                ? `${job.salaryCurrency} ${(job.salaryMin / 100000).toFixed(0)}-${(job.salaryMax / 100000).toFixed(0)} LPA`
                : 'Competitive';
              const postedDate = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

              return (
                <div 
                  key={job.id} 
                  className="card group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary relative overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors duration-300">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <p className="text-gray-600 font-medium text-sm">{job.department || 'Technology'}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-semibold rounded-full shadow-sm">
                        {job.jobType.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-3 mb-5 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-700 text-sm">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <MapPin size={16} className="text-primary" />
                        </div>
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                          <Briefcase size={16} className="text-secondary" />
                        </div>
                        <span className="font-medium">{job.experienceLevel.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <Clock size={16} className="text-orange-600" />
                        </div>
                        <span>Posted {postedDate}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Salary Range</p>
                        <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{salary}</span>
                      </div>
                      <Link
                        href={`/jobs/${job.slug}`}
                        className="btn btn-primary text-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 flex items-center"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12 md:hidden">
          <Link href="/jobs" className="btn btn-outline group">
            View All Jobs
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
