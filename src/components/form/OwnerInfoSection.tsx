import  InputField  from '../form/InputField';
import { FormSection } from '../form/FormSection';
import { FormGrid } from '../form/FormGrid';

interface OwnerInfoSectionProps {
  ownerData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OwnerInfoSection = ({ ownerData, onChange }: OwnerInfoSectionProps) => {
  return (
    <FormSection title="Owner Information">
      <FormGrid>
        <InputField
          label="Full Name"
          name="fullName"
          value={ownerData.fullName}
          onChange={onChange}
          required
          placeholder="Owner's full name"
        />
        
        <InputField
          label="Email"
          type="email"
          name="email"
          value={ownerData.email}
          onChange={onChange}
          required
          placeholder="owner@email.com"
        />
        
        <InputField
          label="Phone"
          type="tel"
          name="phone"
          value={ownerData.phone}
          onChange={onChange}
          required
          placeholder="Owner's phone number"
        />
        
        <InputField
          label="Password"
          type="password"
          name="password"
          value={ownerData.password}
          onChange={onChange}
          required
          placeholder="Create a password"
        />
      </FormGrid>
    </FormSection>
  );
};