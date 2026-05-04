import { Metadata } from 'next';
import { Cookie, Settings, BarChart3, Shield, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy - Skill2Hire Technologies',
  description: 'Learn about how Skill2Hire Technologies uses cookies and similar technologies.',
};

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <Cookie size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Cookie Policy</h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Learn about how we use cookies and similar technologies to improve your experience.
          </p>
          <p className="text-center text-white/80 mt-4">Last Updated: May 2, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how Skill2Hire Technologies ("we," "us," or "our") uses cookies and similar technologies on our website and platform.
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Info className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">2. Why We Use Cookies</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and recommendations</li>
              <li>Analyze website traffic and performance</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-primary bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <Shield className="text-primary mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-navy">3.1 Essential Cookies (Required)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <p className="text-gray-700 text-sm"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4 mt-2">
                  <li>Authentication cookies (keep you logged in)</li>
                  <li>Security cookies (prevent fraudulent activity)</li>
                  <li>Session cookies (maintain your session state)</li>
                </ul>
                <p className="text-gray-700 text-sm mt-3 italic">
                  <strong>Note:</strong> These cookies cannot be disabled as they are essential for the website to work.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-secondary bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <Settings className="text-secondary mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-navy">3.2 Functional Cookies (Optional)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <p className="text-gray-700 text-sm"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4 mt-2">
                  <li>Language preferences</li>
                  <li>Region/location settings</li>
                  <li>User interface customizations</li>
                  <li>Saved job searches and filters</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-primary bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <BarChart3 className="text-primary mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-navy">3.3 Analytics Cookies (Optional)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <p className="text-gray-700 text-sm"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4 mt-2">
                  <li>Google Analytics (traffic analysis)</li>
                  <li>Page view tracking</li>
                  <li>User behavior patterns</li>
                  <li>Performance metrics</li>
                </ul>
                <p className="text-gray-700 text-sm mt-3">
                  <strong>Third-party services:</strong> Google Analytics
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-secondary bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <Cookie className="text-secondary mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-navy">3.4 Marketing Cookies (Optional)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                </p>
                <p className="text-gray-700 text-sm"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4 mt-2">
                  <li>Advertising cookies</li>
                  <li>Social media cookies (Facebook, LinkedIn)</li>
                  <li>Retargeting cookies</li>
                </ul>
                <p className="text-gray-700 text-sm mt-3">
                  <strong>Third-party services:</strong> Facebook Pixel, LinkedIn Insights
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">4. How Long Do Cookies Last?</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">4.1 Session Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These are temporary cookies that expire when you close your browser. They are used to maintain your session while you navigate the website.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">4.2 Persistent Cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              These cookies remain on your device for a set period (ranging from days to years) or until you manually delete them. They remember your preferences and actions across multiple visits.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">5. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Google Analytics:</strong> Helps us understand website usage and improve our services
                  <br />
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    Google Privacy Policy →
                  </a>
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> Tracks conversions and enables targeted advertising
                  <br />
                  <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    Facebook Privacy Policy →
                  </a>
                </li>
                <li>
                  <strong>LinkedIn Insights:</strong> Analyzes professional audience engagement
                  <br />
                  <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    LinkedIn Privacy Policy →
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Settings className="text-primary mr-3" size={28} />
              <h2 className="text-2xl font-bold text-navy">6. How to Manage Cookies</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.1 Cookie Consent Banner</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you first visit our website, you'll see a cookie consent banner. You can choose to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your cookie preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3 mt-6">6.2 Browser Settings</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>Delete existing cookies</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Browser-specific instructions:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-r-lg">
              <p className="text-gray-700 text-sm">
                <strong>⚠️ Important:</strong> Blocking or deleting cookies may affect your ability to use certain features of our website, such as staying logged in or saving your preferences.
              </p>
            </div>
          </section>

          {/* Do Not Track */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">7. Do Not Track Signals</h2>
            <p className="text-gray-700 leading-relaxed">
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT signals, but we respect your privacy choices through our cookie consent banner.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">8. Changes to This Cookie Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any significant changes by posting the updated policy on this page with a new "Last Updated" date.
            </p>
          </section>

          {/* More Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">9. More Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For more information about cookies and how to manage them, visit:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a></li>
              <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a></li>
              <li><a href="https://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a></li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-navy mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="text-gray-700 space-y-2">
              <p><strong>Skill2Hire Technologies</strong></p>
              <p>📧 Email: <a href="mailto:privacy@skill2hiretechnologies.com" className="text-primary hover:underline">privacy@skill2hiretechnologies.com</a></p>
              <p>📧 General: <a href="mailto:skill2hirecode@gmail.com" className="text-primary hover:underline">skill2hirecode@gmail.com</a></p>
              <p>📱 Phone: +91 82203 33917</p>
              <p>📍 Address: #123, Koramangala, Bangalore, Karnataka - 560034, India</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
