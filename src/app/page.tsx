import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
// import TrendingSection from '../components/TreandingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-amber-400">
      <Navbar />
      <HeroSection />
      {/* <TrendingSection /> */}
      <Footer />
    </main>
  );
}