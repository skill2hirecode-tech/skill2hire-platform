import { Metadata } from 'next';
import { FileText, AlertCircle, Scale, Ban, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Skill2Hire Technologies',
  description: 'Terms and conditions for using Skill2Hire Technologies platform and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <FileText size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform and services.
          </p>
          <p className="text-center text-white/80 mt-4">Last Updated: May 2, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Skill2Hire Technologies. By accessing or using our website, mobile application, or services (collectively, the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you and Skill2Hire Technologies ("Company," "we," "us," or "our").
            </p>
          </section>

          {/* Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">2. Our Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Skill2Hire Technologies provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Recruitment Services:</strong> Job posting, candidate matching, and hiring solutions</li>
              <li><strong>Training Programs:</strong> Professional skill development courses and certifications</li>
              <li><strong>Career Services:</strong> Resume building, career counseling, and job search assistance</li>
              <li><strong>Employer Services:</strong> Talent acquisition and workforce development solutions</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">3.2 Account Termination</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any other reason we deem appropriate.
            </p>
          </section>

          {/* User Conduct */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Ban className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">4. Prohibited Activities</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide false or misleading information in job applications or profiles</li>
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm other users or our staff</li>
              <li>Upload viruses, malware, or any harmful code</li>
              <li>Scrape, copy, or download content without permission</li>
              <li>Impersonate another person or entity</li>
              <li>Interfere with the proper functioning of the Platform</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems (bots) to access the Platform</li>
              <li>Post spam, advertisements, or promotional content without authorization</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">5. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">5.1 Our Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on the Platform, including text, graphics, logos, images, software, and course materials, is the property of Skill2Hire Technologies and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">5.2 Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By submitting content (resumes, applications, reviews, etc.) to our Platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content for the purpose of providing our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You retain ownership of your content and are responsible for ensuring you have the right to share it.
            </p>
          </section>

          {/* Job Applications */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">6. Job Applications and Recruitment</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.1 For Job Seekers</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>All information provided in applications must be truthful and accurate</li>
              <li>We are not responsible for hiring decisions made by employers</li>
              <li>We do not guarantee job placement or interview opportunities</li>
              <li>Your resume may be shared with potential employers</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.2 For Employers</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Job postings must be legitimate and comply with employment laws</li>
              <li>You must not discriminate based on protected characteristics</li>
              <li>You are responsible for your hiring decisions and employment practices</li>
              <li>Candidate information must be used only for recruitment purposes</li>
            </ul>
          </section>

          {/* Training Courses */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">7. Training Courses and Programs</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">7.1 Enrollment</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Course enrollment is subject to availability and payment of applicable fees. We reserve the right to cancel or reschedule courses.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">7.2 Refund Policy</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are available within 7 days of enrollment if the course has not started. Once a course begins, refunds are subject to our discretion and may incur administrative fees.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">7.3 Certification</h3>
            <p className="text-gray-700 leading-relaxed">
              Certificates are awarded upon successful completion of course requirements. We do not guarantee job placement or specific outcomes from course completion.
            </p>
          </section>

          {/* Payment Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">8. Payment and Fees</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>All fees are stated in Indian Rupees (INR) unless otherwise specified</li>
              <li>Payment must be made in full before accessing paid services</li>
              <li>We accept payment via credit/debit cards, UPI, and bank transfers</li>
              <li>All sales are final unless otherwise stated in our refund policy</li>
              <li>We reserve the right to change our fees with 30 days notice</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">9. Disclaimers and Limitations</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">9.1 No Warranty</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy or reliability of information</li>
              <li>Job placement or specific outcomes</li>
              <li>Compatibility with all devices or browsers</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">9.2 Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Skill2Hire Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Scale className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">10. Indemnification</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Skill2Hire Technologies, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content you submit to the Platform</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">11. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <RefreshCw className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">12. Changes to Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our Platform or sending an email. Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">13. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-navy mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Skill2Hire Technologies</strong>
              </p>
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:legal@skill2hiretechnologies.com"
                  className="text-primary hover:underline"
                >
                  info@skill2hiretechnologies.com
                </a>
              </p>
              <p>
                📧 General:{" "}
                <a
                  href="mailto:skill2hirecode@gmail.com"
                  className="text-primary hover:underline"
                >
                  hr@skill2hiretechnologies.com
                </a>
              </p>
              <p>📱 Phone: +91 82203 33917</p>
              <p>
                📍 Address: 14th Main cross, 13/A, 6th Cross Rd, Sector 5, HSR
                Layout, Bengaluru, Karnataka, 560102, India
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
