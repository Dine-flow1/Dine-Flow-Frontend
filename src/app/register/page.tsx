"use client";
import { useState } from 'react';
import SectionTitle from "../../components/form/SectionTitle";
import { RegistrationForm } from "../../components/form/RegisterForm";
import { RestaurantData } from '../../types/restaurant';

export default function RegisterPage() {
  const DEFAULT_OWNER = {
    _id: '',
    fullName: '',
    email: '',
    password: '',
    role: 'restaurant_owner' as const,
    
    contact: '',
    profileImage: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      location: {
        type: 'Point' as const,
        coordinates: [0, 0] as [number, number]
      }
    },
    isAccountVerified: false,
    verifyOtp: null,
    verifyOtpExpireAt: null,
    resetOtp: null,
    resetOtpExpireAt: null
  };

  const DEFAULT_RESTAURANT: RestaurantData = {
    _id: '',
    restaurantName: '',
    restaurantType: '',
    description: '',
    logo: '',
    bannerImage: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    cuisine: '',
    address: '',
    location: '',
    geolocation: null,
    deliveryRadius: 0,
    openingHours: {},
    panNumber: '',
    gstinNumber: '',
    fssaiNumber: '',
    registrationNumber: '',
    owner: DEFAULT_OWNER,
    ownerId: '',
    branches: [],
    menu: [],
    categories: [],
    isVerified: false,
    isApproved: false,
    status: 'pending_verification',
    approvalStatus: 'pending',
    approvedBy: null,
    approvedAt: null,
    createdAt: new Date().toISOString(),
    otp: null,
    otpExpires: null
  };

  const [formData, setFormData] = useState<RestaurantData>(DEFAULT_RESTAURANT);
  
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
        [e.target.name]: e.target.value ?? "",
      } as typeof formData.owner,
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

  try {
    const payload = {
      restaurantData: {
        restaurantName: formData.restaurantName,
        restaurantType: formData.restaurantType,
        description: formData.description,
        logo: formData.logo,
        bannerImage: formData.bannerImage,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: formData.address,
        geolocation: formData.geolocation,
        openingHours: formData.openingHours,
        deliveryRadius: formData.deliveryRadius,
        panNumber: formData.panNumber,
        gstinNumber: formData.gstinNumber,
        fssaiNumber: formData.fssaiNumber,
        registrationNumber: formData.registrationNumber,
      },
      ownerData: {
        fullName: formData.owner!.fullName,
        email: formData.owner!.email,
        password: formData.owner!.password,
        phone: formData.owner!.phone,
        role: formData.owner!.role,
      },
    };

    const response = await fetch("http://localhost:5000/api/restaurants/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Registration failed. Please try again.");
      return;
    }

    alert("🎉 Restaurant registered successfully! You can now login.");
    window.location.href = "/login";

  } catch (err) {
    console.error("Registration error:", err);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
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