'use client';
import { useState } from 'react';
import { 
  FaUtensils, 
  FaShippingFast, 
  FaShieldAlt, 
  FaChartLine, 
  FaUsers, 
  FaAward,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story');

  const services = [
    {
      icon: <FaUtensils className="w-8 h-8" />,
      title: 'Restaurant Management',
      description: 'Complete suite for managing menus, orders, inventory, and staff in one intuitive platform.',
      features: ['Menu Management', 'Order Processing', 'Inventory Tracking', 'Staff Scheduling']
    },
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: 'Online Ordering System',
      description: 'Seamless online ordering with real-time tracking and multiple payment options.',
      features: ['Real-time Tracking', 'Multiple Payment Gateways', 'Order History', 'Customer Notifications']
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with PCI DSS compliance and data protection.',
      features: ['PCI DSS Compliance', 'Data Encryption', 'Regular Audits', 'Backup Systems']
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into sales, customer behavior, and operational efficiency.',
      features: ['Sales Analytics', 'Customer Insights', 'Performance Metrics', 'Custom Reports']
    }
  ];

  const teamMembers = [
    {
      name: 'John Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      bio: '15+ years in restaurant technology and hospitality management.'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Former Google engineer specializing in scalable cloud solutions.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Expert in restaurant industry solutions with 10+ years experience.'
    },
    {
      name: 'Emily Chen',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Dedicated to ensuring every client achieves their business goals.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to transform restaurant operations' },
    { year: '2019', title: 'First 100 Clients', description: 'Reached milestone with 100 restaurant partners' },
    { year: '2020', title: 'Platform 2.0 Launch', description: 'Introduced advanced analytics and AI features' },
    { year: '2021', title: 'National Expansion', description: 'Expanded services across the United States' },
    { year: '2022', title: '500+ Restaurants', description: 'Served over 500 restaurants nationwide' },
    { year: '2023', title: 'Mobile App Launch', description: 'Released iOS and Android apps for on-the-go management' }
  ];

  const values = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Customer Centric',
      description: 'We put our customers first in everything we do.'
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in every feature and interaction.'
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We continuously innovate to stay ahead of industry trends.'
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We believe in transparency and honest business practices.'
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Growth',
      description: 'We help our customers grow their business effectively.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Reliability',
      description: 'Our systems are built for 99.9% uptime and reliability.'
    }
  ];

  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About DineFlow
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              We're revolutionizing the restaurant industry with technology that empowers
              businesses to thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {['story', 'services', 'team', 'values', 'milestones'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2018 by restaurant industry veterans, DineFlow was born from 
                    a simple yet powerful observation: restaurants were struggling with fragmented 
                    technology solutions that didn't talk to each other.
                  </p>
                  <p>
                    Our founders, John Chen and Sarah Johnson, combined their expertise in 
                    hospitality and technology to create a unified platform that simplifies 
                    restaurant management while driving growth.
                  </p>
                  <p>
                    Today, we serve hundreds of restaurants across the country, from cozy 
                    neighborhood cafes to multi-location chains. Our mission remains unchanged: 
                    to empower restaurants with technology that just works.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">500+</div>
                    <div className="text-sm text-gray-600">Restaurants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <FaUtensils className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">Transforming Restaurants Since 2018</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything a modern restaurant needs to succeed in one platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-amber-600 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="text-amber-300 mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="opacity-90">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="milestones" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Journey Timeline</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 hidden lg:block"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center mb-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white hidden lg:block"></div>
                  
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12 lg:text-right'}`}>
                    <div className="text-gray-400 text-sm mt-4 lg:mt-0">
                      Milestone {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Be part of the restaurant revolution. Let's build something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300 flex items-center gap-2">
                Get Started <FaArrowRight />
              </button>
              <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
     </>
  );
};

export default AboutUs;