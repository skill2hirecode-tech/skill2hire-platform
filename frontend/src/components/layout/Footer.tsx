import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14">
                <Image 
                  src="/images/s2h-logo.svg" 
                  alt="Skill2Hire Technologies" 
                  width={56} 
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg">
                  Skill<span className="text-secondary">2</span>Hire
                </div>
                <div className="text-xs text-secondary font-medium">Technologies</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting Talent with Opportunity. Your trusted partner for
              recruitment and professional training.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Our Courses
                </Link>
              </li> */}
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Recruitment Services</li>
              <li className="text-gray-300">Training Programs</li>
              <li className="text-gray-300">Career Counseling</li>
              <li className="text-gray-300">Skill Assessment</li>
              <li className="text-gray-300">Corporate Training</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">
                  14th Main cross, 13/A, <br />
                  6th Cross Rd, Sector 5, <br />
                  HSR Layout, Bengaluru, Karnataka-560102, India <br />
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">+91 8792516505 </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">info@skill2hiretechnologies.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Skill2Hire Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
