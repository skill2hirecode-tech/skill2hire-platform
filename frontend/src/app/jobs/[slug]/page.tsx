'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Briefcase, MapPin, Clock, CheckCircle, Upload, Mail, Phone, User, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  department: string;
  skills: string[];
  benefits: string[];
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '',
    coverLetter: '',
  });

  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    if (slug) {
      fetchJob();
    }
  }, [slug]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/jobs/slug/${slug}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setJob(data.data.job);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', job!.id);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('currentCompany', formData.currentCompany);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      formDataToSend.append('noticePeriod', formData.noticePeriod);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('resume', resume);

      console.log('Submitting application for job:', job!.id);

      const response = await fetch(`${apiUrl}/jobs/${job!.id}/apply`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('Application submitted successfully! We\'ll contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          experience: '',
          currentCompany: '',
          expectedSalary: '',
          noticePeriod: '',
          coverLetter: '',
        });
        setResume(null);
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        toast.error(data.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Application error:', error);
      toast.error('Failed to submit application. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
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

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy mb-4">Job Not Found</h1>
            <a href="/jobs" className="btn btn-primary">
              Back to Jobs
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {job.jobType.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {job.title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {job.department || 'Skill2Hire Technologies'}
              </p>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  <span>{job.experienceLevel.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center">
                  <IndianRupee size={20} className="mr-2" />
                  <span>
                    {job.salaryMin && job.salaryMax
                      ? `${(job.salaryMin / 100000).toFixed(1)}-${(job.salaryMax / 100000).toFixed(1)} LPA`
                      : 'Competitive Salary'}
                  </span>
                </div>
                {job.expiresAt && (
                  <div className="flex items-center">
                    <Clock size={20} className="mr-2" />
                    <span>Deadline: {new Date(job.expiresAt).toLocaleDateString()}</span>
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
              {/* Left Column - Job Details */}
              <div className="lg:col-span-2">
                {/* Job Description */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                {/* Responsibilities */}
                {job.responsibilities && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-navy mb-6">Key Responsibilities</h2>
                    <div className="space-y-3">
                      {job.responsibilities.split('\n').map((resp, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="text-secondary mr-3 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-navy mb-6">Requirements</h2>
                    <div className="space-y-3">
                      {job.requirements.split('\n').map((req, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="text-primary mr-3 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">Required Skills</h2>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-navy mb-6">Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Application Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="card">
                    <h3 className="text-2xl font-bold text-navy mb-6">Apply for this Job</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="input pl-10"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input pl-10"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label">Phone *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="input pl-10"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label">Total Experience *</label>
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="e.g., 3 years"
                        />
                      </div>

                      <div>
                        <label className="label">Current Company</label>
                        <input
                          type="text"
                          name="currentCompany"
                          value={formData.currentCompany}
                          onChange={handleChange}
                          className="input"
                          placeholder="Company name"
                        />
                      </div>

                      <div>
                        <label className="label">Expected Salary</label>
                        <input
                          type="text"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleChange}
                          className="input"
                          placeholder="e.g., 8-10 LPA"
                        />
                      </div>

                      <div>
                        <label className="label">Notice Period</label>
                        <input
                          type="text"
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleChange}
                          className="input"
                          placeholder="e.g., 30 days"
                        />
                      </div>

                      <div>
                        <label className="label">Cover Letter</label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          rows={4}
                          className="input resize-none"
                          placeholder="Tell us why you're a great fit..."
                        />
                      </div>

                      <div>
                        <label className="label">Resume * (PDF, DOC, DOCX - Max 5MB)</label>
                        <div className="relative">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                          >
                            <Upload size={20} className="mr-2 text-gray-400" />
                            <span className="text-gray-600">
                              {resume ? resume.name : 'Choose file'}
                            </span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By applying, you agree to our terms and privacy policy
                      </p>
                    </form>
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
