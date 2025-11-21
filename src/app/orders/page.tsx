import OrderHistory from '../../components/order/OrderHistory';
import Footer from "../../components/ui/Footer"
import Navbar from "../../components/ui/Navbar"

export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          <OrderHistory userId="current-user" showStats={true} compact={false} />
        </div>
      </div>
      <Footer />
    </>
  );
}