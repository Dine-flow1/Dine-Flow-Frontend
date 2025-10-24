import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Owner, Golden Dragon Restaurant",
    image: "🧑‍💼",
    rating: 5,
    quote: "RestroHub transformed how we manage operations. Our wait times dropped by 40% and customer satisfaction is at an all-time high."
  },
  {
    name: "Sarah Williams",
    role: "Manager, La Bella Italia",
    image: "👩‍💼",
    rating: 5,
    quote: "The online ordering system alone has increased our revenue by 25%. The support team is incredibly responsive and helpful."
  },
  {
    name: "James Morrison",
    role: "Owner, The Grill House",
    image: "🧑‍💼",
    rating: 5,
    quote: "Best investment we made for our restaurant. The analytics feature helped us optimize our menu and pricing strategy."
  },
  {
    name: "Emma Rodriguez",
    role: "Chef & Owner, Tapas Lounge",
    image: "👩‍🍳",
    rating: 5,
    quote: "Managing multiple locations is now effortless. The centralized dashboard gives me full visibility across all restaurants."
  },
  {
    name: "David Thompson",
    role: "Operations Manager, Urban Bistro",
    image: "🧑‍💼",
    rating: 5,
    quote: "The staff scheduling feature alone saved us thousands in labor costs. RestroHub is a game-changer for restaurant management."
  },
  {
    name: "Lisa Park",
    role: "Owner, Sakura Sushi",
    image: "👩‍💼",
    rating: 5,
    quote: "Outstanding platform with exceptional customer support. They genuinely care about their customers' success."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center animate-slide-up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-gold-100 text-gold-700">
            ⭐ Loved by Restaurants
          </span>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl text-foreground">
            What Restaurant Owners Say
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Join thousands of happy restaurant owners who have transformed their business with RestroHub.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 transition-all duration-300 bg-white border shadow-md group rounded-2xl border-gold-100 hover:border-gold-300 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 font-medium leading-relaxed text-gray-700">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 text-2xl rounded-full bg-gradient-to-br from-gold-400 to-wine-500">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block max-w-2xl p-8 glass rounded-2xl lg:p-12">
            <h3 className="mb-6 text-3xl font-bold text-foreground">
              Join 5,000+ Restaurants Today
            </h3>
            <p className="mb-8 text-gray-600">
              Start your free 30-day trial. No credit card required. No long-term contract.
            </p>
            <button className="btn-primary">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
