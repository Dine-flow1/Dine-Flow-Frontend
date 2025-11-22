"use client";
import { useState } from 'react';
import { OrderAddress } from '../../types/order';
import { showErrorAlert, showSuccessToast } from '../../utils/sweetAlert';

interface AddressFormProps {
  address: OrderAddress;
  onSubmit: (address: OrderAddress) => void;
}

const AddressForm = ({ address, onSubmit }: AddressFormProps) => {
  const [formData, setFormData] = useState<OrderAddress>(address);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Enhanced validation
      if (!formData.hotel.trim()) {
        showErrorAlert('Please enter the hotel or property name.', 'Hotel Name Required');
        return;
      }
      
      if (!formData.street.trim()) {
        showErrorAlert('Please enter your street address and room number.', 'Street Address Required');
        return;
      }
      
      if (!formData.city.trim()) {
        showErrorAlert('Please enter your city.', 'City Required');
        return;
      }
      
      if (!formData.state.trim()) {
        showErrorAlert('Please enter your state.', 'State Required');
        return;
      }
      
      if (!formData.zipCode.trim()) {
        showErrorAlert('Please enter your ZIP code.', 'ZIP Code Required');
        return;
      }
      
      if (!formData.phone.trim()) {
        showErrorAlert('Please enter your phone number for delivery updates.', 'Phone Number Required');
        return;
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        showErrorAlert('Please enter a valid phone number.', 'Invalid Phone Number');
        return;
      }

      onSubmit(formData);
      showSuccessToast('Address saved! Proceeding to payment...');
    } catch (error) {
      showErrorAlert('Failed to save address. Please try again.', 'Save Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hotel/Property Name */}
        <div>
          <label htmlFor="hotel" className="block text-sm font-medium text-gray-700 mb-2">
            Hotel / Property Name 
          </label>
          <input
            type="text"
            id="hotel"
            name="hotel"
            value={formData.hotel}
            onChange={handleChange}
            placeholder="e.g., Grand Plaza Hotel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* Street Address */}
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="e.g., Room 405, 123 Main Street"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* Delivery Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Instructions (Optional)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions || ''}
            onChange={handleChange}
            placeholder="e.g., Call upon arrival, front desk will guide, leave at reception..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Validating...</span>
            </>
          ) : (
            <>
              <span>➡️</span>
              <span>Continue to Payment</span>
            </>
          )}
        </button>
      </form>

      {/* Security Note */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <span className="text-green-600">🔒</span>
          <p className="text-sm text-green-800">
            Your information is secure and will only be used for delivery purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;