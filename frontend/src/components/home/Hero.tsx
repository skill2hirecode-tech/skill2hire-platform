'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-dark text-white py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Connecting Talent with{' '}
            <span className="text-secondary">Opportunity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in">
            Your trusted partner for professional recruitment and skill development
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Link href="/jobs" className="btn bg-secondary hover:bg-secondary-600 text-white px-8 py-4 text-lg">
              <Briefcase className="mr-2" size={20} />
              Explore Jobs
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link href="/courses" className="btn bg-white text-navy hover:bg-gray-100 px-8 py-4 text-lg">
              <GraduationCap className="mr-2" size={20} />
              Browse Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-gray-300">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-gray-300">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">1000+</div>
              <div className="text-gray-300">Placements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">100+</div>
              <div className="text-gray-300">Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
