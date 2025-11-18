// src/components/restaurant-owners/CTASection.tsx
import Link from 'next/link';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Restaurant?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of successful restaurant owners who are growing their business with DINERAL
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/signUp?type=restaurant"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-200 hover:scale-105"
          >
            Start Free Trial
          </Link>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
            Schedule a Demo
          </button>
        </div>
        
        <p className="text-blue-200 mt-6 text-sm">
          No credit card required • Free 30-day trial • Setup in minutes
        </p>
      </div>
    </section>
  );
};