import { RestaurantInfoSection } from './RestuarantInfoSection';
import { OwnerInfoSection } from './OwnerInfoSection';
import { BusinessRegistrationSection } from './BussinessRegistrationSection';
// import { ImageUploadSection } from './ImageUploadSection';
import  SubmitButton  from '../form/SubmitButton';
import { RestaurantData } from '../../types/restruant';

interface RegistrationFormProps {
  formData: RestaurantData;
  loading: boolean;
  onRestaurantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onOwnerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoChange: (file: File | null) => void;
  onBannerChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegistrationForm = ({
  formData,
  loading,
  onRestaurantChange,
  onOwnerChange,
  onLogoChange,
  onBannerChange,
  onSubmit
}: RegistrationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="p-8 bg-white shadow-xl rounded-2xl">
      <RestaurantInfoSection 
        formData={formData} 
        onChange={onRestaurantChange} 
      />
      
      <OwnerInfoSection 
        ownerData={formData.owner} 
        onChange={onOwnerChange} 
      />
      
      <BusinessRegistrationSection 
        formData={formData} 
        onChange={onRestaurantChange} 
      />
      
      {/* <ImageUploadSection 
        onLogoChange={onLogoChange}
        onBannerChange={onBannerChange}
      /> */}
      
      <div className="mt-8">
        <SubmitButton loading={loading}>
          Register Restaurant
        </SubmitButton>
      </div>
      
      <p className="mt-4 text-sm text-center text-gray-600">
        By registering, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};