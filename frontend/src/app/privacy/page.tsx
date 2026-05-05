import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Skill2Hire Technologies',
  description: 'Learn how Skill2Hire Technologies collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <Shield size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-center text-white/80 mt-4">Last Updated: May 2, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Skill2Hire Technologies ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website and services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Database className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">2. Information We Collect</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Register for an account</li>
              <li>Apply for jobs through our platform</li>
              <li>Enroll in training courses</li>
              <li>Contact us via forms or email</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Resume/CV</li>
              <li>Educational qualifications</li>
              <li>Work experience</li>
              <li>Professional skills</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device information</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <UserCheck className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">3. How We Use Your Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Job Recruitment:</strong> To process job applications and match candidates with suitable positions</li>
              <li><strong>Training Services:</strong> To manage course enrollments and deliver training programs</li>
              <li><strong>Communication:</strong> To respond to inquiries, send updates, and provide customer support</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our platform</li>
              <li><strong>Marketing:</strong> To send newsletters and promotional materials (with your consent)</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Eye className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">4. Information Sharing and Disclosure</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>With Employers:</strong> When you apply for jobs, we share your application details with potential employers</li>
              <li><strong>Service Providers:</strong> With third-party vendors who help us operate our platform (e.g., email services, hosting)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>We do not sell your personal information to third parties.</strong>
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Lock className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">5. Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure database storage</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@skill2hiretechnologies.com" className="text-primary hover:underline">privacy@skill2hiretechnologies.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to improve your browsing experience. For detailed information about our cookie usage, please see our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Job applications and resumes are typically retained for 2 years, while course enrollment data is kept for the duration of the course plus 1 year.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Mail className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">11. Contact Us</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us:
            </p>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Skill2Hire Technologies</strong>
              </p>
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:privacy@skill2hiretechnologies.com"
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
                Layout, Bangalore, Karnataka - 560034, India <br />
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
