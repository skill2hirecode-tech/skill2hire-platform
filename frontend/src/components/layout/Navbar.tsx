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
    // { href: '/courses', label: 'Courses', icon: GraduationCap },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between h-24">

          {/* ===== LOGO + BRAND ===== */}
          <Link href="/" className="flex items-center gap-3 md:gap-4">

  {/* Logo */}
  <div className="flex items-center justify-center h-[72px] w-[72px] md:h-[90px] md:w-[96px]">
    <Image
      src="/images/s2h-logo.svg"
      alt="Skill2Hire Technologies"
      width={96}
      height={96}
      className="object-contain"
      priority
    />
  </div>

  {/* BRAND TEXT (Hidden on Mobile) */}
  <div className="hidden md:flex flex-col justify-center text-[#071a3d] leading-tight">

    {/* Main Brand */}
    <div className="text-[34px] lg:text-[42px] font-extrabold tracking-[1px]">
      SKILL<span className="text-[#39B54A]">2</span>HIRE
    </div>

    {/* Technologies Line */}
    <div className="flex items-center gap-2 mt-[2px]">
      <div className="w-6 h-[2px] bg-[#1565C0]" />

      <div className="text-[10px] lg:text-[12px] font-semibold tracking-[5px] text-[#1565C0] uppercase">
        Technologies
      </div>

      <div className="w-6 h-[2px] bg-[#1565C0]" />
    </div>

    {/* Tagline */}
    <div className="mt-[2px] text-[11px] lg:text-[13px] text-gray-700">
      Connecting Talent with Opportunity
    </div>

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
          </div>
        )}
      </div>
    </nav>
  );
}
