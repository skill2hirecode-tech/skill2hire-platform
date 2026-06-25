import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedJobs from '@/components/home/FeaturedJobs';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ContactSection from '@/components/home/ContactSection';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CookieConsent from '@/components/shared/CookieConsent';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedJobs />
        {/* <FeaturedCourses /> */}
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
