import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/ui/Hero';
import Footer from '../components/ui/Footer';
import FeaturesPage from './features/page';
import TestimonialsSection from '../components/ui/TestinomlSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-amber-50 to-amber-100 lg:to-amber-400">
      
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <Navbar />
      </div>
      
      
      <section className="w-full">
        <HeroSection />
      </section>
      

      <section className="w-full py-8 md:py-12 lg:py-16">
        <FeaturesPage />
      </section>
      

      <section className="w-full py-8 md:py-12 lg:py-16 bg-white/50">
        <TestimonialsSection />
      </section>
      
      
      <footer className="w-full">
        <Footer />
      </footer>
    </main>
  );
}