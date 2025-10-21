import { ChangeEvent } from 'react';
import FormInput from '@/components/ui/FormInput';

interface AddressFormProps {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressForm({ address, onChange }: AddressFormProps) {
  return (
    <div className="pt-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
      
      <div className="space-y-4">
        <FormInput
          id="address-street"
          name="address.street"
          type="text"
          label="Street Address"
          placeholder="123 Main St"
          value={address.street}
          onChange={onChange}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            id="address-city"
            name="address.city"
            type="text"
            label="City"
            placeholder="New York"
            value={address.city}
            onChange={onChange}
            required
          />

          <FormInput
            id="address-state"
            name="address.state"
            type="text"
            label="State"
            placeholder="NY"
            value={address.state}
            onChange={onChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            id="address-zip"
            name="address.zipCode"
            type="text"
            label="ZIP Code"
            placeholder="10001"
            value={address.zipCode}
            onChange={onChange}
            required
          />

          <FormInput
            id="address-country"
            name="address.country"
            type="text"
            label="Country"
            placeholder="United States"
            value={address.country}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </div>
  );
}