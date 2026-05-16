import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Skill2Hire Technologies - Connecting Talent with Opportunity',
  description: 'Professional recruitment and training services. Find your dream job or enhance your skills with our expert-led courses.',
  keywords: 'recruitment, training, jobs, courses, skill development, career growth, hiring',
  authors: [{ name: 'Skill2Hire Technologies' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/s2h-logo.svg', sizes: '64x64', type: 'image/svg+xml' },
    ],
    apple: '/images/s2h-logo.svg',
  },
  openGraph: {
    title: 'Skill2Hire Technologies',
    description: 'Connecting Talent with Opportunity',
    url: 'https://skill2hiretechnologies.com',
    siteName: 'Skill2Hire Technologies',
    locale: 'en_IN',
    type: 'website',
    images: [{
      url: '/images/s2h-logo-full.svg',
      width: 1000,
      height: 600,
      alt: 'Skill2Hire Technologies - Connecting Talent with Opportunity',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skill2Hire Technologies',
    description: 'Connecting Talent with Opportunity',
    images: ['/images/s2h-logo-full.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
