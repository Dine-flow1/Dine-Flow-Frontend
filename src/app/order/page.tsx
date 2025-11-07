import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';

export default function OrderPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-20 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
              Order Management
            </h1>
            <p className="text-lg text-gray-600">
              Coming soon - Streamline your order management process with our powerful tools.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}