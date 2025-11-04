import Navbar from '../components/Navbar';
import HeroSection from '../components/Hero';
import Footer from '../components/Footer';
import FeaturesPage from './features/page';
import TestimonialsSection from '../components/TestinomlSection';
export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-amber-50 md:to-amber-100 lg:to-amber-400">
      <Navbar />
      <HeroSection />
      <FeaturesPage/>
      <TestimonialsSection />
      <Footer />
    </main>
  );
}