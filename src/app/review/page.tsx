'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerReviewForm from '@/components/reviews/CustomerReviewForm';
import RestaurantReviewForm from '@/components/reviews/RestaurantReviewForm';
import Card, { CardContent } from '@/components/ui/Card';
import { MessageSquare, Utensils, Sparkles } from 'lucide-react';

const SubmitReviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('customer');

  const handleCustomerReviewSubmit = (data: any) => {
    console.log('Customer review submitted:', data);
    // Submit to API here
    alert('Thank you for your review!');
  };

  const handleRestaurantReviewSubmit = (data: any) => {
    console.log('Restaurant review submitted:', data);
    // Submit to API here
    alert('Thank you for your valuable feedback!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <MessageSquare className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve and assists others in making better decisions
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-1 md:grid-cols-2 mb-8">
            <TabsTrigger value="customer" className="data-[state=active]:bg-blue-100">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <span>Customer Review</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="restaurant" className="data-[state=active]:bg-green-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Restaurant Owner Review</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CustomerReviewForm
                  onSubmit={handleCustomerReviewSubmit}
                />
              </div>
              <div>
                <Card className="sticky top-24" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">Why Your Review Matters</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Help other diners find great restaurants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Restaurants value your honest feedback</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Earn rewards for helpful reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Improve the dining experience for everyone</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="restaurant">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RestaurantReviewForm
                  onSubmit={handleRestaurantReviewSubmit}
                />
              </div>
              <div>
                <Card className="sticky top-24" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">Benefits of Sharing</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                        <span>Get featured in our success stories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                        <span>Help shape future features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                        <span>Connect with other restaurant owners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                        <span>Earn premium features credits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Reviews Submitted</div>
          </Card>
          <Card className="text-center p-6" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
            <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </Card>
          <Card className="text-center p-6" title={''} rating={0} orders={0} imageUrl={''} description={''} price={''}>
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Restaurant Partners</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;