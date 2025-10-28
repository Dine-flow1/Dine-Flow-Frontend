import  InputField  from '../form/InputField';
import { FormSection } from '../form/FormSection';
import { FormGrid } from '../form/FormGrid';

interface BusinessRegistrationSectionProps {
  formData: {
    panNumber: string;
    gstinNumber: string;
    fssaiNumber: string;
    registrationNumber: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BusinessRegistrationSection = ({ formData, onChange }: BusinessRegistrationSectionProps) => {
  return (
    <FormSection title="Business Registration">
      <FormGrid>
        <InputField
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={onChange}
          required
          placeholder="ABCDE1234F"
        />
        
        <InputField
          label="GSTIN Number"
          name="gstinNumber"
          value={formData.gstinNumber}
          onChange={onChange}
          required
          placeholder="22ABCDE1234F1Z5"
        />
        
        <InputField
          label="FSSAI Number"
          name="fssaiNumber"
          value={formData.fssaiNumber}
          onChange={onChange}
          required
          placeholder="FSSAI license number"
        />
        
        <InputField
          label="Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={onChange}
          required
          placeholder="Business registration number"
        />
      </FormGrid>
    </FormSection>
  );
};