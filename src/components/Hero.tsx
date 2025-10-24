import { ArrowRight } from "lucide-react";
import TrendingCarousel from "./ui/TrendingCarousel";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-gold-50 via-orange-50 to-red-50"></div>
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-gold-200 mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-wine-200 mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
        
        {/* Food imagery background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-8xl">🍽️</div>
          <div className="absolute bottom-32 left-10 text-8xl">🍷</div>
          <div className="absolute top-1/2 right-1/4 text-8xl">🔪</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 text-sm font-semibold rounded-full bg-gold-100 text-gold-700">
                ✨ The Future of Restaurant Management
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-7xl text-foreground">
              Grow Your Restaurant
              <span className="block gradient-text">Business with Ease</span>
            </h1>

            <p className="max-w-xl mb-8 text-xl leading-relaxed text-gray-700">
              An all-in-one restaurant management platform combining POS, online ordering, reservations, and analytics. Streamline operations and delight your customers.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex items-center justify-center gap-2 btn-primary group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center justify-center gap-2 btn-secondary">
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-4 mt-12">
              <p className="text-sm text-gray-600">Trusted by over 5,000 restaurants worldwide</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white border-2 border-white rounded-full bg-linear-to-br from-gold-400 to-wine-500"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">Join thousands of happy restaurant owners</span>
              </div>
            </div>
          </div>

          {/* Right Side - Trending Items Carousel */}
          <div className="relative hidden lg:block">
            <TrendingCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
