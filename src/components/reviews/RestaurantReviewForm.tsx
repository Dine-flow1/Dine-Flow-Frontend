import React, { useState } from 'react';
import { Star, Building, Users, BarChart, Clock, DollarSign, Send } from 'lucide-react';
import Button from '@/components/ui/Buttons';
import { Textarea } from '../../components/ui/textArea';
import { Input } from '@/components/ui/input';
import Card from '../../components/ui/Card';
import { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Slider } from '../../components/ui/Slider';
import { Switch } from '@/components/ui/switch';

interface RestaurantReviewFormProps {
  onSubmit: (review: RestaurantReviewData) => void;
}

export interface RestaurantReviewData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  rating: number;
  review: string;
  metrics: {
    revenueIncrease: number;
    timeSaved: number;
    customerSatisfaction: number;
    staffEfficiency: number;
  };
  featuresUsed: string[];
  monthsUsing: number;
  wouldRecommend: boolean;
  testimonialQuote: string;
  allowContact: boolean;
}

const RestaurantReviewForm: React.FC<RestaurantReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState<RestaurantReviewData>({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    rating: 0,
    review: '',
    metrics: {
      revenueIncrease: 0,
      timeSaved: 0,
      customerSatisfaction: 0,
      staffEfficiency: 0,
    },
    featuresUsed: [],
    monthsUsing: 0,
    wouldRecommend: true,
    testimonialQuote: '',
    allowContact: true,
  });

  const features = [
    { id: 'online_ordering', label: 'Online Ordering' },
    { id: 'table_reservation', label: 'Table Reservation' },
    { id: 'inventory', label: 'Inventory Management' },
    { id: 'staff_scheduling', label: 'Staff Scheduling' },
    { id: 'analytics', label: 'Analytics Dashboard' },
    { id: 'customer_management', label: 'Customer Management' },
    { id: 'multi_location', label: 'Multi-location Support' },
    { id: 'pos', label: 'POS Integration' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof RestaurantReviewData] as any),
          [child]: Number(value),
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => {
      const newFeatures = prev.featuresUsed.includes(featureId)
        ? prev.featuresUsed.filter(id => id !== featureId)
        : [...prev.featuresUsed, featureId];
      return { ...prev, featuresUsed: newFeatures };
    });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [name]: value[0],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, rating });
  };

  const renderStars = (value: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverRating || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              } transition-colors duration-200`}
            />
          </button>
        ))}
      </div>
    );
  };

  const MetricSlider = ({ 
    icon: Icon, 
    label, 
    name, 
    value, 
    min = 0, 
    max = 100,
    suffix = '%'
  }: {
    icon: React.ElementType;
    label: string;
    name: string;
    value: number;
    min?: number;
    max?: number;
    suffix?: string;
  }) => (
    <div className="space-y-3 p-4 border rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <label className="text-sm font-medium">{label}</label>
        <span className="ml-auto font-bold text-blue-700">
          {value}{suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={5}
        onValueChange={(value) => handleSliderChange(name, value)}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Restaurant Owner Review
        </CardTitle>
        <p className="text-center text-gray-600 mt-2">
          Share your experience using DineFlow to help other restaurants
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Restaurant & Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Restaurant Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  placeholder="Your Restaurant Name"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Owner/Manager Name *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="owner@restaurant.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          {/* Overall Rating */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Overall Rating of DineFlow *
            </label>
            <div className="flex flex-col items-center gap-4">
              {renderStars(rating)}
              <div className="flex gap-4 text-sm">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          {/* Usage Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              How long have you been using DineFlow? *
            </label>
            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-gray-400" />
              <select
                name="monthsUsing"
                value={formData.monthsUsing}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  monthsUsing: Number(e.target.value)
                }))}
                className="flex-1 border rounded-lg px-3 py-2"
                required
              >
                <option value="0">Select duration</option>
                <option value="1">1 month</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">1 year</option>
                <option value="24">2+ years</option>
              </select>
            </div>
          </div>

          {/* Metrics Improvement */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Impact on Your Business
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricSlider
                icon={DollarSign}
                label="Revenue Increase"
                name="revenueIncrease"
                value={formData.metrics.revenueIncrease}
              />
              <MetricSlider
                icon={Clock}
                label="Time Saved Weekly"
                name="timeSaved"
                value={formData.metrics.timeSaved}
                max={40}
                suffix=" hours"
              />
              <MetricSlider
                icon={BarChart}
                label="Customer Satisfaction"
                name="customerSatisfaction"
                value={formData.metrics.customerSatisfaction}
              />
              <MetricSlider
                icon={Users}
                label="Staff Efficiency"
                name="staffEfficiency"
                value={formData.metrics.staffEfficiency}
              />
            </div>
          </div>

          {/* Features Used */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Features You Use *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Switch
                    checked={formData.featuresUsed.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <label className="text-sm">{feature.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Review *
            </label>
            <Textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="How has DineFlow helped your restaurant? Share your story..."
              rows={5}
              required
            />
          </div>

          {/* Testimonial Quote */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Short Testimonial Quote (for display)
            </label>
            <Textarea
              name="testimonialQuote"
              value={formData.testimonialQuote}
              onChange={handleInputChange}
              placeholder="A memorable quote from your review that we can feature..."
              rows={2}
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.testimonialQuote.length}/200 characters
            </p>
          </div>

          {/* Contact Permission */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium">Allow DineFlow to contact you?</p>
              <p className="text-sm text-gray-600">
                We may reach out to feature your story or for feedback
              </p>
            </div>
            <Switch
              checked={formData.allowContact}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                allowContact: checked
              }))}
            />
          </div>

          {/* Recommendation */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="recommend"
              checked={formData.wouldRecommend}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                wouldRecommend: e.target.checked
              }))}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="recommend" className="text-sm">
              I would recommend DineFlow to other restaurant owners
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline">
              Clear Form
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-8"
              disabled={
                rating === 0 ||
                !formData.restaurantName ||
                !formData.ownerName ||
                !formData.email ||
                formData.monthsUsing === 0 ||
                !formData.review
              }
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RestaurantReviewForm;