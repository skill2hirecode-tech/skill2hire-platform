import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Target, Users, Award, TrendingUp, Briefcase, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'About Us - Skill2Hire Technologies',
  description: 'Learn about Skill2Hire Technologies - A dynamic recruitment and training company bridging the gap between talent and opportunity.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Skill2Hire Technologies
              </h1>
              <p className="text-xl text-gray-200">
                Bridging the gap between talented individuals and the right career opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Main About Content */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Skill2Hire Technologies is a dynamic recruitment and training company dedicated to bridging the gap between talented individuals and the right career opportunities. We focus on empowering job seekers with industry-relevant skills while helping organizations find the best talent to drive their success.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our approach combines practical training, career guidance, and efficient hiring solutions to create a strong connection between candidates and employers. We believe that the right skills, combined with the right opportunity, can transform careers and businesses alike.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Skill2Hire Technologies, we offer comprehensive training programs designed to enhance technical and professional skills, making candidates job-ready in today's competitive market. Alongside this, our recruitment services help companies streamline their hiring process by providing qualified and well-trained candidates.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Our mission is to build a skilled workforce and support organizations in achieving their hiring goals with ease and efficiency. We are committed to quality, integrity, and long-term success for both individuals and businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-gradient-primary text-white rounded-lg shadow-lg">
                <Target size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-white/90">
                  To build a skilled workforce and support organizations in achieving their hiring goals with ease and efficiency
                </p>
              </div>
              <div className="text-center p-8 bg-navy text-white rounded-lg shadow-lg">
                <TrendingUp size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-white/90">
                  To be the leading platform that transforms careers and businesses through the perfect blend of skills and opportunities
                </p>
              </div>
              <div className="text-center p-8 bg-secondary text-white rounded-lg shadow-lg">
                <Award size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Values</h3>
                <p className="text-white/90">
                  Quality, Integrity, and Long-term Success for both individuals and businesses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title">What We Do</h2>
              <p className="section-subtitle">
                Comprehensive solutions for career growth and talent acquisition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Training Programs */}
              <div className="card group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="text-secondary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Training Programs</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive training programs designed to enhance technical and professional skills, making candidates job-ready in today's competitive market.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Industry-relevant curriculum
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Practical, hands-on training
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Expert instructors
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Career guidance and support
                  </li>
                </ul>
              </div>

              {/* Recruitment Services */}
              <div className="card group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Recruitment Services</h3>
                <p className="text-gray-600 mb-4">
                  Efficient hiring solutions that help companies streamline their recruitment process by providing qualified and well-trained candidates.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Pre-screened candidates
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Skill-matched placements
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Fast hiring process
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Quality assurance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="section-title">Our Approach</h2>
                <p className="section-subtitle">
                  Creating strong connections between candidates and employers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">Practical Training</h3>
                  <p className="text-gray-600">
                    Industry-relevant skills development through hands-on learning
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">Career Guidance</h3>
                  <p className="text-gray-600">
                    Personalized support to help you achieve your professional goals
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">Efficient Hiring</h3>
                  <p className="text-gray-600">
                    Streamlined recruitment process connecting talent with opportunity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-dark text-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
                <div className="text-gray-300">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
                <div className="text-gray-300">Training Programs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">1000+</div>
                <div className="text-gray-300">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">100+</div>
                <div className="text-gray-300">Partner Companies</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Ready to Transform Your Career or Find Top Talent?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of successful candidates and satisfied employers who trust Skill2Hire Technologies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/jobs" className="btn btn-primary px-8 py-4 text-lg">
                  Explore Jobs
                </a>
                <a href="/courses" className="btn btn-secondary px-8 py-4 text-lg">
                  Browse Courses
                </a>
                <a href="/contact" className="btn btn-outline px-8 py-4 text-lg">
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
