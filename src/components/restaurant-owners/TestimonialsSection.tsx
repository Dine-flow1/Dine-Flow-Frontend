// src/components/restaurant-owners/TestimonialsSection.tsx
import { OwnerTestimonial } from '../../types/restaurant-owner';

const testimonials: OwnerTestimonial[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    restaurant: 'El Patio Mexicano',
    comment: 'DINERAL helped us increase our online orders by 300% in just 3 months! The analytics are incredible.',
    avatar: '👩‍🍳',
    rating: 5
  },
  {
    id: '2',
    name: 'James Chen',
    restaurant: 'Dragon Palace',
    comment: 'The customer management tools transformed how we engage with our regular customers. Highly recommended!',
    avatar: '👨‍💼',
    rating: 5
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    restaurant: 'Urban Bistro',
    comment: 'Setup was incredibly easy, and the support team is always there when we need them.',
    avatar: '👩‍💼',
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Restaurant Owners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how DINEFLOW is helping restaurants thrive in the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: OwnerTestimonial }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-4">{testimonial.avatar}</div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.restaurant}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400">★</span>
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{testimonial.comment}"</p>
    </div>
  );
};