import OrderHistory from '../../components/order/OrderHistory';
import Footer from "../../components/ui/Footer"
import Navbar from "../../components/ui/Navbar"

export default function OrdersPage() {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat pt-16"
        style={{
          backgroundImage: 'url("https://www.foodiv.com/wp-content/uploads/2025/08/Selecting-the-Right-Food-Ordering-System.jpg")',
          height: '40vh',
          minHeight: '300px'
        }}
      >
        {/* Dark Overlay for better text readability */}

        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Your Orders
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white md:text-xl">
              Track and manage your orders
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-gray-50 py-8 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <OrderHistory userId="current-user" showStats={true} compact={false} />
        </div>
      </div>
      
      <Footer />
    </>
  );
}