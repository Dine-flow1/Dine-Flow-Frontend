'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, Star, User, Clock, CheckCircle, XCircle, Send, Smile, Frown } from 'lucide-react';

interface CustomerFeedback {
  id: number;
  customerName: string;
  tableNumber?: string;
  rating: number;
  comment: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
  response?: string;
}

interface CustomerIssue {
  id: number;
  type: 'complaint' | 'request' | 'suggestion';
  customerName: string;
  tableNumber: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  time: string;
}

export function CustomerInteraction() {
  const [feedback, setFeedback] = useState<CustomerFeedback[]>([
    { id: 1, customerName: 'John D.', tableNumber: 'Table 3', rating: 5, comment: 'Excellent service! Food was amazing.', date: '2 hours ago', status: 'new' },
    { id: 2, customerName: 'Sarah M.', tableNumber: 'Table 7', rating: 3, comment: 'Food was good but service was slow.', date: '5 hours ago', status: 'reviewed' },
    { id: 3, customerName: 'Mike R.', tableNumber: 'Table 5', rating: 1, comment: 'Order was incorrect and cold.', date: '1 day ago', status: 'resolved', response: 'We apologize and will provide a complimentary meal on your next visit.' },
    { id: 4, customerName: 'Emma L.', rating: 5, comment: 'Best dining experience ever!', date: '2 days ago', status: 'new' },
  ]);

  const [issues, setIssues] = useState<CustomerIssue[]>([
    { id: 1, type: 'complaint', customerName: 'Alex B.', tableNumber: 'Table 2', description: 'Food arrived cold', priority: 'high', status: 'pending', time: '15 min ago' },
    { id: 2, type: 'request', customerName: 'Lisa K.', tableNumber: 'Table 8', description: 'Need extra napkins', priority: 'low', status: 'in-progress', time: '30 min ago' },
    { id: 3, type: 'suggestion', customerName: 'David P.', tableNumber: 'Table 4', description: 'Add more vegetarian options', priority: 'medium', status: 'resolved', time: '1 hour ago' },
  ]);

  const [activeTab, setActiveTab] = useState<'feedback' | 'issues'>('feedback');
  const [selectedFeedback, setSelectedFeedback] = useState<CustomerFeedback | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    gsap.from('.customer-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const stats = {
    averageRating: (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1),
    newFeedback: feedback.filter(f => f.status === 'new').length,
    pendingIssues: issues.filter(i => i.status === 'pending').length,
    totalFeedback: feedback.length,
  };

  const updateFeedbackStatus = (id: number, status: CustomerFeedback['status']) => {
    setFeedback(feedback.map(f => 
      f.id === id ? { ...f, status, response: responseText } : f
    ));
    setSelectedFeedback(null);
    setResponseText('');
  };

  const updateIssueStatus = (id: number, status: CustomerIssue['status']) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status } : i));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Customer Interaction</h1>
        <p className="text-gray-600">Manage customer feedback, complaints, and requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Avg. Rating', value: stats.averageRating, icon: Star, color: 'text-yellow-600' },
          { label: 'New Feedback', value: stats.newFeedback, icon: MessageSquare, color: 'text-blue-600' },
          { label: 'Pending Issues', value: stats.pendingIssues, icon: Clock, color: 'text-red-600' },
          { label: 'Total Feedback', value: stats.totalFeedback, icon: User, color: 'text-purple-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'feedback'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MessageSquare className="inline h-4 w-4 mr-2" />
            Customer Feedback
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'issues'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Clock className="inline h-4 w-4 mr-2" />
            Active Issues
          </button>
        </div>
      </div>

      {activeTab === 'feedback' ? (
        <div className="space-y-6">
          {feedback.map((item) => (
            <div key={item.id} className="customer-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800">{item.customerName}</h3>
                      {item.tableNumber && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                          {item.tableNumber}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${getRatingColor(item.rating)}`}>
                        {item.rating}/5
                      </span>
                      <span className="text-sm text-gray-500">• {item.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{item.comment}</p>
              </div>

              {item.response && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Your Response:</p>
                  <p className="text-gray-600">{item.response}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedFeedback(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Respond
                  </button>
                  {item.status !== 'resolved' && (
                    <button
                      onClick={() => updateFeedbackStatus(item.id, 'resolved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateFeedbackStatus(item.id, 'reviewed')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Mark Reviewed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {issues.map((issue) => (
            <div key={issue.id} className="customer-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    issue.type === 'complaint' ? 'bg-red-100' :
                    issue.type === 'request' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {issue.type === 'complaint' ? (
                      <Frown className="h-5 w-5 text-red-600" />
                    ) : issue.type === 'request' ? (
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Smile className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800">{issue.customerName}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {issue.tableNumber}
                      </span>
                      <span className="px-2 py-1 text-sm rounded capitalize bg-blue-100 text-blue-800">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{issue.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(issue.priority)}`}>
                    {issue.priority} priority
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{issue.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Take Action
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Contact Customer
                  </button>
                </div>
                <div className="flex space-x-2">
                  {issue.status === 'pending' && (
                    <button
                      onClick={() => updateIssueStatus(issue.id, 'in-progress')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Start Progress
                    </button>
                  )}
                  {issue.status === 'in-progress' && (
                    <button
                      onClick={() => updateIssueStatus(issue.id, 'resolved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Respond to Customer</h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Customer Feedback:</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{selectedFeedback.customerName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < selectedFeedback.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{selectedFeedback.comment}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Type your response to the customer..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateFeedbackStatus(selectedFeedback.id, 'resolved')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Customer Service Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
            <span className="font-medium">Resolve Complaint</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
            <span className="font-medium">Send Follow-up</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Star className="h-6 w-6 text-yellow-600 mb-2" />
            <span className="font-medium">Request Review</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <User className="h-6 w-6 text-purple-600 mb-2" />
            <span className="font-medium">Check Table Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}