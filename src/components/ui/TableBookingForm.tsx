// components/TableBookingForm.tsx
"use client";

import { useState } from "react";
import { RestaurantData } from "@/src/types/restruant";

interface TableBookingFormProps {
  restaurant: RestaurantData;
}

export default function TableBookingForm({ restaurant }: TableBookingFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle table booking logic here
    console.log("Table booking submitted:", formData);
    alert("Table booked successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Book a Table at {restaurant.restaurantName}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Date */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white transition-colors duration-200 bg-yellow-500 rounded-xl hover:bg-yellow-600"
          >
            Book Table Now
          </button>
        </form>

        {/* Restaurant Info */}
        <div className="p-4 mt-6 bg-yellow-50 rounded-xl">
          <h4 className="mb-2 font-semibold text-gray-800">Restaurant Information</h4>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {restaurant.address}<br/>
            <strong>Phone:</strong> {restaurant.contactPhone}<br/>
            <strong>Hours:</strong> {restaurant.openingHours}
          </p>
        </div>
      </div>
    </div>
  );
}