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
  openGraph: {
    title: 'Skill2Hire Technologies',
    description: 'Connecting Talent with Opportunity',
    url: 'https://skill2hiretechnologies.com',
    siteName: 'Skill2Hire Technologies',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skill2Hire Technologies',
    description: 'Connecting Talent with Opportunity',
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
