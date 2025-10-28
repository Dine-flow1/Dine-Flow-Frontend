"use client";
import { useState } from 'react';
import SectionTitle from "../../components/form/SectionTitle";
import { RegistrationForm } from "../../components/form/RegisterForm";
import { RestaurantData, OwnerInfo } from '../../types/restruant';

export default function RegisterPage() {
  const [formData, setFormData] = useState<RestaurantData>({
    restaurantName: '',
    restaurantType: '',
    description: '',
    logo: '',
    bannerImage: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    geolocation: '',
    openingHours: '',
    deliveryRadius: '',
    panNumber: '',
    gstinNumber: '',
    fssaiNumber: '',
    registrationNumber: '',
    owner: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      role: 'owner',
      isAccountVerified: false,
    },
  });
  
  const [loading, setLoading] = useState(false);

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      owner: {
        ...formData.owner,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleLogoChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          bannerImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Handle registration logic here
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            title="Register Your Restaurant"
            subtitle="Join our platform and start growing your business"
            centered
          />
          
          <RegistrationForm
            formData={formData}
            loading={loading}
            onRestaurantChange={handleRestaurantChange}
            onOwnerChange={handleOwnerChange}
            onLogoChange={handleLogoChange}
            onBannerChange={handleBannerChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}