'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call will be implemented
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                Get In Touch
              </h1>
              <p className="text-xl text-gray-200">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10">
              {/* Phone Card */}
              <div className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Mon-Sat: 9:00 AM - 6:00 PM</p>
                <a href="tel:+918220333917" className="text-primary hover:text-primary-600 font-medium text-lg">
                  +91 82203 33917
                </a>
                <br />
                <a href="tel:+918220333917" className="text-primary hover:text-primary-600 font-medium">
                  +91 82203 33917
                </a>
              </div>

              {/* Email Card */}
              <div className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">We'll respond within 24 hours</p>
                <a href="mailto:info@skill2hiretechnologies.com" className="text-secondary hover:text-secondary-600 font-medium">
                  info@skill2hiretechnologies.com
                </a>
                <br />
                <a href="mailto:hr@skill2hiretechnologies.com" className="text-secondary hover:text-secondary-600 font-medium">
                  hr@skill2hiretechnologies.com
                </a>
              </div>

              {/* Location Card */}
              <div className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-3">Come say hello at our office</p>
                <p className="text-gray-700 font-medium">
                  Koramangala, Bangalore<br />
                  Karnataka - 560034
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card">
                <h2 className="text-3xl font-bold text-navy mb-6">Send us a Message</h2>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                  <div>
                    <label className="label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information & Map */}
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="card">
                  <h3 className="text-2xl font-bold text-navy mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Office Address</h4>
                        <p className="text-gray-600">
                          #123, 4th Floor, Koramangala<br />
                          6th Block, Bangalore<br />
                          Karnataka - 560034, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="text-secondary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Phone Numbers</h4>
                        <p className="text-gray-600">
                          <a href="tel:+918220333917" className="hover:text-primary">+91 82203 33917</a><br />
                          <a href="tel:+918220333917" className="hover:text-primary">+91 82203 33917</a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Email Addresses</h4>
                        <p className="text-gray-600">
                          <a href="mailto:info@skill2hiretechnologies.com" className="hover:text-primary">
                            info@skill2hiretechnologies.com
                          </a><br />
                          <a href="mailto:hr@skill2hiretechnologies.com" className="hover:text-primary">
                            hr@skill2hiretechnologies.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="card bg-gradient-primary text-white">
                  <div className="flex items-center mb-4">
                    <Clock size={24} className="mr-2" />
                    <h3 className="text-2xl font-bold">Business Hours</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="card bg-secondary text-white">
                  <div className="flex items-center mb-4">
                    <MessageCircle size={24} className="mr-2" />
                    <h3 className="text-2xl font-bold">Quick Contact</h3>
                  </div>
                  <p className="mb-4">
                    Need immediate assistance? Contact us directly via WhatsApp or call us now!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="https://wa.me/918220333917?text=Hello%20Skill2Hire%20Technologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white text-secondary hover:bg-gray-100 flex items-center justify-center"
                    >
                      <MessageCircle size={18} className="mr-2" />
                      WhatsApp
                    </a>
                    <a 
                      href="tel:+918220333917"
                      className="btn bg-white text-secondary hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Phone size={18} className="mr-2" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Find Us on Map</h2>
              <p className="section-subtitle">
                Visit our office in Koramangala, Bangalore
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6279446749845!2d77.61214431482178!3d12.935025990881094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed898fc47%3A0x1681f38e8c7a79!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Quick answers to common questions
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="card">
                <h3 className="text-lg font-bold text-navy mb-2">What are your office timings?</h3>
                <p className="text-gray-600">
                  We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-bold text-navy mb-2">How can I enroll in a course?</h3>
                <p className="text-gray-600">
                  You can enroll by visiting our Courses page, selecting your desired course, and filling out the enrollment form. You can also call us or visit our office directly.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-bold text-navy mb-2">Do you provide placement assistance?</h3>
                <p className="text-gray-600">
                  Yes! We provide comprehensive placement assistance to all our students, including resume building, interview preparation, and job referrals to our partner companies.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-bold text-navy mb-2">Can I visit your office for a consultation?</h3>
                <p className="text-gray-600">
                  Absolutely! We welcome walk-in consultations during our business hours. However, we recommend calling ahead to schedule an appointment to ensure availability.
                </p>
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
