'use client';

import { useState, FormEvent } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaHeadset,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Navbar from '../ui/Navbar';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactChannels = [
    {
      icon: <FaPhone className="w-8 h-8" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Available 24/7 for urgent matters',
      action: 'tel:+15551234567',
      actionText: 'Call Now'
    },
    {
      icon: <FaEnvelope className="w-8 h-8" />,
      title: 'Email Us',
      details: ['support@dineflow.com', 'sales@dineflow.com'],
      description: 'Response within 2 business hours',
      action: 'mailto:support@dineflow.com',
      actionText: 'Send Email'
    },
    {
      icon: <FaWhatsapp className="w-8 h-8" />,
      title: 'WhatsApp',
      details: ['+1 (555) 123-4567'],
      description: 'Quick chat support',
      action: 'https://wa.me/15551234567',
      actionText: 'Start Chat'
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: 'Live Chat',
      details: ['Available on website'],
      description: 'Instant support during business hours',
      action: '#',
      actionText: 'Open Chat'
    }
  ];

  const departments = [
    {
      name: 'Technical Support',
      email: 'support@dinflow.com',
      phone: '+1 (555) 123-4567',
      hours: '24/7',
      description: 'For technical issues and platform support'
    },
    {
      name: 'Sales & Onboarding',
      email: 'sales@dineflow.com',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri, 9AM-6PM EST',
      description: 'For new customers and pricing inquiries'
    },
    {
      name: 'Billing & Accounts',
      email: 'billing@dineflow.com',
      phone: '+1 (555) 456-7890',
      hours: 'Mon-Fri, 9AM-5PM EST',
      description: 'For billing questions and account management'
    },
    {
      name: 'Partnerships',
      email: 'partners@dineflow .com',
      phone: '+1 (555) 789-0123',
      hours: 'Mon-Fri, 9AM-6PM EST',
      description: 'For business partnerships and integrations'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, San Francisco, CA 94107',
      phone: '+1 (415) 123-4567',
      hours: 'Mon-Fri, 9AM-6PM PST',
      isHeadquarters: true
    },
    {
      city: 'New York',
      address: '456 Business Ave, New York, NY 10001',
      phone: '+1 (212) 987-6543',
      hours: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      city: 'Chicago',
      address: '789 Lake Shore Drive, Chicago, IL 60601',
      phone: '+1 (312) 456-7890',
      hours: 'Mon-Fri, 9AM-5PM CST'
    }
  ];

  const faqs = [
    {
      question: 'What is your typical response time?',
      answer: 'We aim to respond to all inquiries within 2 business hours. Urgent technical issues receive priority and are usually addressed within 30 minutes.'
    },
    {
      question: 'Do you offer 24/7 support?',
      answer: 'Yes, we provide 24/7 technical support via phone and email for critical issues. General inquiries are handled during business hours.'
    },
    {
      question: 'How can I schedule a demo?',
      answer: 'You can schedule a demo by filling out the contact form, calling our sales team, or using the "Schedule Demo" button on our website.'
    },
    {
      question: 'What information should I include in my support request?',
      answer: 'Please include your account email, a detailed description of the issue, steps to reproduce if applicable, and any error messages you\'re seeing.'
    }
  ];

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      await Swal.fire({
        title: 'Message Sent Successfully!',
        html: `
          <div class="text-left">
            <p class="mb-2">Thank you for contacting us, <strong>${formData.name}</strong>!</p>
            <p class="text-sm text-gray-600">We've received your message and will get back to you within 24 hours.</p>
            <div class="mt-4 p-3 bg-amber-50 rounded-lg">
              <p class="text-sm"><strong>Reference ID:</strong> RST-${Date.now().toString().slice(-6)}</p>
            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#d97706',
        confirmButtonText: 'OK'
      });

      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      await Swal.fire({
        title: 'Submission Failed',
        text: 'There was an error sending your message. Please try again or contact us directly.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              We're here to help. Reach out to us through any channel that works for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that suits you best
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-amber-600 mb-4">{channel.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{channel.title}</h3>
                <div className="space-y-1 mb-4">
                  {channel.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-4">{channel.description}</p>
                <a
                  href={channel.action}
                  className="inline-block w-full text-center py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300"
                >
                  {channel.actionText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <FaPaperPlane className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
                </div>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-600">We'll contact you within 24 hours.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      } focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <FaExclamationCircle className="flex-shrink-0" /> {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      } focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <FaExclamationCircle className="flex-shrink-0" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.subject ? 'border-red-300' : 'border-gray-300'
                      } focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition`}
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <FaExclamationCircle className="flex-shrink-0" /> {formErrors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.message ? 'border-red-300' : 'border-gray-300'
                    } focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition resize-none`}
                    placeholder="How can we help you today?"
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FaExclamationCircle className="flex-shrink-0" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Departments */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact by Department</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-colors duration-300">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{dept.name}</h4>
                      <div className="space-y-2">
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaEnvelope className="text-amber-500 flex-shrink-0" />
                          <a href={`mailto:${dept.email}`} className="hover:text-amber-600 transition-colors">
                            {dept.email}
                          </a>
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaPhone className="text-amber-500 flex-shrink-0" />
                          <a href={`tel:${dept.phone}`} className="hover:text-amber-600 transition-colors">
                            {dept.phone}
                          </a>
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaClock className="text-amber-500 flex-shrink-0" />
                          {dept.hours}
                        </p>
                      </div>
                      <p className="mt-3 text-sm text-gray-500">{dept.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <FaFacebook />, label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
                    { icon: <FaTwitter />, label: 'Twitter', color: 'hover:bg-sky-500 hover:text-white' },
                    { icon: <FaInstagram />, label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
                    { icon: <FaLinkedin />, label: 'LinkedIn', color: 'hover:bg-blue-700 hover:text-white' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our locations across the country
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  office.isHeadquarters ? 'border-2 border-amber-300 relative' : ''
                }`}
              >
                {office.isHeadquarters && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full">
                    Headquarters
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                    {office.isHeadquarters && (
                      <span className="text-xs text-amber-600 font-medium">Main Office</span>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">{office.address}</p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaPhone className="text-amber-500 flex-shrink-0" />
                    {office.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaClock className="text-amber-500 flex-shrink-0" />
                    {office.hours}
                  </p>
                </div>
                <div className="mt-6 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{office.city} Office</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-amber-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <FaHeadset className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Support</h2>
            <p className="text-gray-600 mb-6">
              For critical system outages or urgent technical issues requiring immediate attention
            </p>
            <div className="space-y-3">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                <FaPhone />
                Emergency Hotline: +1 (555) 123-4567
              </a>
              <p className="text-sm text-gray-500">
                Available 24/7 for critical issues only
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact; 