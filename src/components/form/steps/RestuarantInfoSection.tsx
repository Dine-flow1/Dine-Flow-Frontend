interface RestaurantInfoStepProps {
  formData: {
    restaurantName: string;
    restaurantType: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    openingHours: string;
    deliveryRadius: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPrev: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export const RestaurantInfoStep = ({
  formData,
  onChange,
  onPrev,
  onSubmit,
  loading,
}: RestaurantInfoStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Restaurant Details
        </h3>
        <p className="text-gray-600">Tell us about your restaurant</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              placeholder="The Gourmet Kitchen"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Type *
          </label>
          <div className="relative">
            <select
              name="restaurantType"
              value={formData.restaurantType}
              onChange={onChange as any}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all appearance-none"
            >
              <option value="">Select type</option>
              <option value="fine_dining">Fine Dining</option>
              <option value="casual_dining">Casual Dining</option>
              <option value="fast_food">Fast Food</option>
              <option value="cafe">Cafe</option>
              <option value="food_truck">Food Truck</option>
              <option value="bakery">Bakery</option>
              <option value="pizzeria">Pizzeria</option>
              <option value="other">Other</option>
            </select>
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Email *
          </label>
          <div className="relative">
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              placeholder="contact@restaurant.com"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Phone *
          </label>
          <div className="relative">
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              placeholder="+91 9876543210"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Address *
          </label>
          <div className="relative">
            <textarea
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              rows={3}
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none"
              placeholder="123 Main Street, City, State, ZIP Code"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              required
              rows={4}
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none"
              placeholder="Describe your restaurant's cuisine, ambiance, specialties..."
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Opening Hours *
            </label>
            <div className="relative">
              <input
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={onChange}
                required
                className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                placeholder="Mon-Sun: 10:00 AM - 10:00 PM"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Radius (km)
            </label>
            <div className="relative">
              <input
                type="number"
                name="deliveryRadius"
                value={formData.deliveryRadius}
                onChange={onChange}
                className="w-full px-4 py-3 pl-11 pr-11 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                placeholder="5"
                min="0"
                step="1"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                km
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <button
            type="button"
            onClick={onSubmit}
            disabled={
              loading ||
              !formData.restaurantName ||
              !formData.restaurantType ||
              !formData.description
            }
            className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2" />
                Registering...
              </div>
            ) : (
              "Complete Registration"
            )}
          </button>

          <button
            type="button"
            onClick={onPrev}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};
