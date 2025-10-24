import { Zap, ShoppingCart, Calendar, BarChart3, Users, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Advanced POS System",
    description: "Fast, reliable point-of-sale system with inventory management and staff tracking."
  },
  {
    icon: ShoppingCart,
    title: "Online Ordering",
    description: "Accept orders from customers with delivery tracking and seamless payment integration."
  },
  {
    icon: Calendar,
    title: "Table Reservations",
    description: "Manage bookings efficiently with automated confirmations and customer management."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain insights into sales, customer behavior, and inventory with detailed reports."
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Schedule shifts, track performance, and manage payroll all in one place."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with industry standards for data protection."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center animate-slide-up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-gold-100 text-gold-700">
            ✨ Powerful Features
          </span>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl text-foreground">
            Everything You Need to Run Your Restaurant
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Our all-in-one platform gives you complete control over operations, customers, and growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 transition-all duration-300 border group rounded-2xl border-gold-100 bg-gradient-to-br from-white to-gold-50 hover:border-gold-300 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center mb-6 transition-transform w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-wine-600 group-hover:scale-110">
                  <Icon className="text-white w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>

                {/* Hover effect border */}
                <div className="absolute inset-0 transition-all pointer-events-none rounded-2xl bg-gradient-to-br from-gold-500/0 to-wine-500/0 group-hover:from-gold-500/5 group-hover:to-wine-500/5"></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-gray-600">
            Ready to transform your restaurant operations?
          </p>
          <button className="btn-primary">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
