import React, { useState } from 'react';
import { Star, Send, Camera, Smile } from 'lucide-react';
import Button from '../../components/ui/Buttons';
import { Textarea } from '../../components/ui/textArea';
import { Input } from '../../components/ui/input';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface CustomerReviewFormProps {
  restaurantId?: string;
  restaurantName?: string;
  onSubmit: (review: CustomerReviewData) => void;
}

export interface CustomerReviewData {
  rating: number;
  comment: string;
  userName: string;
  userEmail: string;
  visitedDate: string;
  foodQuality: number;
  serviceQuality: number;
  ambiance: number;
  valueForMoney: number;
  photos?: File[];
  wouldRecommend: boolean;
}

const CustomerReviewForm: React.FC<CustomerReviewFormProps> = ({
  restaurantId,
  restaurantName,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState<CustomerReviewData>({
    rating: 0,
    comment: '',
    userName: '',
    userEmail: '',
    visitedDate: new Date().toISOString().split('T')[0],
    foodQuality: 0,
    serviceQuality: 0,
    ambiance: 0,
    valueForMoney: 0,
    photos: [],
    wouldRecommend: true,
  });

  const categories = [
    { name: 'foodQuality', label: 'Food Quality' },
    { name: 'serviceQuality', label: 'Service Quality' },
    { name: 'ambiance', label: 'Ambiance' },
    { name: 'valueForMoney', label: 'Value for Money' },
  ];

  const handleCategoryRating = (category: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...(prev.photos || []), ...files],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, rating });
  };

  const renderStars = (value: number, onChange: (value: number) => void, size: 'sm' | 'lg' = 'lg') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`${
                size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
              } ${
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

  return (
    <Card className="max-w-2xl mx-auto" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {restaurantName ? `Share Your Experience at ${restaurantName}` : 'Share Your Dining Experience'}
        </CardTitle>
        <p className="text-center text-gray-600 mt-2">
          Your review helps other diners make better choices
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Overall Rating
            </label>
            <div className="flex flex-col items-center gap-4">
              {renderStars(rating, setRating, 'lg')}
              <div className="flex gap-4 text-sm">
                <span className={rating >= 1 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>Poor</span>
                <span className={rating >= 3 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>Good</span>
                <span className={rating >= 5 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>Excellent</span>
              </div>
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Rate Individual Aspects
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <label className="block text-sm font-medium">
                    {category.label}
                  </label>
                  {renderStars(
                    formData[category.name as keyof CustomerReviewData] as number,
                    (value) => handleCategoryRating(category.name, value),
                    'sm'
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name *
              </label>
              <Input
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Email *
              </label>
              <Input
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Visit *
            </label>
            <Input
              name="visitedDate"
              type="date"
              value={formData.visitedDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Review Comment */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Share Your Experience *
            </label>
            <Textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Tell us about your experience... What did you love? What could be improved?"
              rows={4}
              className="resize-none"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">
                Minimum 50 characters
              </span>
              <span className={`text-sm ${
                formData.comment.length < 50 ? 'text-red-500' : 'text-green-500'
              }`}>
                {formData.comment.length}/2000
              </span>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drag & drop photos or</p>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button type="button" variant="outline" className="cursor-pointer">
                  Browse Files
                </Button>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Maximum 5 photos, 5MB each
              </p>
              {formData.photos && formData.photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">
                    {formData.photos.length} photo(s) selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="recommend"
              name="wouldRecommend"
              checked={formData.wouldRecommend}
              onChange={handleInputChange}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="recommend" className="text-sm">
              I would recommend this restaurant to others
            </label>
            <Smile className="w-5 h-5 text-green-500 ml-auto" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={
                rating === 0 ||
                formData.comment.length < 50 ||
                !formData.userName ||
                !formData.userEmail
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

export default CustomerReviewForm;