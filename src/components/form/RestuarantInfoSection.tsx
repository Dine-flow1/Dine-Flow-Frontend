import InputField from './InputField';
import { TextAreaField } from './TextAreaField';
import { FormSection } from './FormSection';
import { FormGrid } from './FormGrid';

interface RestaurantInfoSectionProps {
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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const RestaurantInfoSection = ({ formData, onChange }: RestaurantInfoSectionProps) => {
  return (
    <FormSection title="Restaurant Information">
      <FormGrid>
        <InputField
          label="Restaurant Name"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={onChange}
          required
          placeholder="Enter restaurant name"
        />
        
        <InputField
          label="Restaurant Type"
          name="restaurantType"
          value={formData.restaurantType}
          onChange={onChange}
          required
          placeholder="e.g., Fine Dining, Cafe, Fast Food"
        />
        
        <TextAreaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          placeholder="Describe your restaurant"
        />
        
        <InputField
          label="Contact Email"
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={onChange}
          required
          placeholder="restaurant@email.com"
        />
        
        <InputField
          label="Contact Phone"
          type="tel"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={onChange}
          required
          placeholder="+1 234 567 8900"
        />
        
        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
          placeholder="Full address"
          className="md:col-span-2"
        />
        
        <InputField
          label="Opening Hours"
          name="openingHours"
          value={formData.openingHours}
          onChange={onChange}
          required
          placeholder="e.g., 9:00 AM - 10:00 PM"
        />
        
        <InputField
          label="Delivery Radius (km)"
          type="number"
          name="deliveryRadius"
          value={formData.deliveryRadius}
          onChange={onChange}
          placeholder="5"
        />
      </FormGrid>
    </FormSection>
  );
};