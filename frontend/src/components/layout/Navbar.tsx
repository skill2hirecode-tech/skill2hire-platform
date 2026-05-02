'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Briefcase, GraduationCap, Info, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/courses', label: 'Courses', icon: GraduationCap },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S2H</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-navy">Skill2Hire</div>
              <div className="text-xs text-secondary">Technologies</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </Link>
            ))}
            <Link href="/admin" className="btn btn-primary">
              Admin Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block mt-4 btn btn-primary w-full text-center"
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
