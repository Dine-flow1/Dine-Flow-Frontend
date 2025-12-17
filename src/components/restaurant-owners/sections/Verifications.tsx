'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, XCircle, Eye, Search, Filter, AlertCircle, Clock, Check, X, Download } from 'lucide-react';

interface VerificationRequest {
  id: number;
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  documentType: 'business' | 'license' | 'identity' | 'tax';
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submittedDate: string;
  documents: {
    name: string;
    url: string;
    type: string;
  }[];
  reviewNotes?: string;
}

export function Verifications() {
  const [requests, setRequests] = useState<VerificationRequest[]>([
    {
      id: 1,
      restaurantName: 'La Bella Vista',
      ownerName: 'Marco Rossi',
      email: 'marco@labellavista.com',
      phone: '+1 234 567 8900',
      address: '123 Main St, New York, NY',
      documentType: 'business',
      status: 'pending',
      submittedDate: '2023-12-01',
      documents: [
        { name: 'Business License.pdf', url: '#', type: 'license' },
        { name: 'Tax Certificate.pdf', url: '#', type: 'tax' }
      ]
    },
    {
      id: 2,
      restaurantName: 'Sakura Sushi',
      ownerName: 'Yuki Tanaka',
      email: 'yuki@sakura.com',
      phone: '+1 234 567 8901',
      address: '456 Oak Ave, Los Angeles, CA',
      documentType: 'license',
      status: 'approved',
      submittedDate: '2023-11-28',
      documents: [
        { name: 'Food License.pdf', url: '#', type: 'license' },
        { name: 'Health Certificate.pdf', url: '#', type: 'license' }
      ],
      reviewNotes: 'All documents verified and approved.'
    },
    {
      id: 3,
      restaurantName: 'Taco Fiesta',
      ownerName: 'Carlos Mendez',
      email: 'carlos@tacofiesta.com',
      phone: '+1 234 567 8902',
      address: '789 Beach Blvd, Miami, FL',
      documentType: 'identity',
      status: 'rejected',
      submittedDate: '2023-11-25',
      documents: [
        { name: 'ID Card.jpg', url: '#', type: 'identity' },
        { name: 'Proof of Address.pdf', url: '#', type: 'identity' }
      ],
      reviewNotes: 'Address verification failed. Please provide updated proof of address.'
    },
    {
      id: 4,
      restaurantName: 'Le Petit Bistro',
      ownerName: 'Sophie Laurent',
      email: 'sophie@lepetit.com',
      phone: '+1 234 567 8903',
      address: '321 Elm St, Chicago, IL',
      documentType: 'tax',
      status: 'under-review',
      submittedDate: '2023-11-30',
      documents: [
        { name: 'Tax ID Certificate.pdf', url: '#', type: 'tax' },
        { name: 'EIN Document.pdf', url: '#', type: 'tax' }
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    gsap.from('.verification-card', {
      duration: 0.5,
      y: 20,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      case 'under-review':
        return (
          <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </span>
        );
      default:
        return null;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'license':
        return '📋';
      case 'tax':
        return '💰';
      case 'identity':
        return '🆔';
      case 'business':
        return '🏢';
      default:
        return '📄';
    }
  };

  const handleApprove = (id: number) => {
    setRequests(requests.map(request =>
      request.id === id 
        ? { ...request, status: 'approved', reviewNotes }
        : request
    ));
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const handleReject = (id: number) => {
    if (reviewNotes.trim() === '') {
      alert('Please provide a reason for rejection');
      return;
    }
    setRequests(requests.map(request =>
      request.id === id 
        ? { ...request, status: 'rejected', reviewNotes }
        : request
    ));
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const stats = [
    { label: 'Total Requests', value: requests.length, color: 'text-gray-600' },
    { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Approved', value: requests.filter(r => r.status === 'approved').length, color: 'text-green-600' },
    { label: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, color: 'text-red-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Approved Verification</h1>
        <p className="text-gray-600">Review and manage restaurant verification requests</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search by restaurant, owner, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="under-review">Under Review</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Requests Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Restaurant</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Owner</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Documents</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Submitted</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">{request.restaurantName}</p>
                      <p className="text-sm text-gray-500">{request.address}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{request.ownerName}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                      <p className="text-sm text-gray-500">{request.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-2">
                      {request.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          <span>{getDocumentIcon(doc.type)}</span>
                          <span className="truncate max-w-[100px]">{doc.name}</span>
                        </a>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(request.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Review Request"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {request.status === 'pending' || request.status === 'under-review' ? (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setReviewNotes('');
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Review Verification Request
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Request Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Restaurant Name</p>
                    <p className="font-medium">{selectedRequest.restaurantName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Owner Name</p>
                    <p className="font-medium">{selectedRequest.ownerName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Contact Email</p>
                    <p className="font-medium">{selectedRequest.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{selectedRequest.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Restaurant Address</p>
                  <p className="font-medium">{selectedRequest.address}</p>
                </div>

                {/* Documents Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Submitted Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRequest.documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">{getDocumentIcon(doc.type)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500 capitalize">{doc.type} Document</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4">
                          <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            View Document
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Review Notes</h4>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add review notes or reason for approval/rejection..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  {selectedRequest.reviewNotes && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Previous Review Notes</p>
                          <p className="text-yellow-700 mt-1">{selectedRequest.reviewNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  {selectedRequest.status === 'pending' || selectedRequest.status === 'under-review' ? (
                    <>
                      <button
                        onClick={() => handleReject(selectedRequest.id)}
                        disabled={reviewNotes.trim() === ''}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          reviewNotes.trim() === ''
                            ? 'bg-red-200 text-red-400 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Reject Request
                      </button>
                      <button
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve Request
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}