'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { UserPlus, Search, Phone, Mail, Calendar, Shield, MoreVertical } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'on-leave' | 'inactive';
  hireDate: string;
  salary: number;
}

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: 'Alex Johnson', role: 'Head Chef', email: 'alex@restaurant.com', phone: '+1 234 567 8900', department: 'Kitchen', status: 'active', hireDate: '2022-05-15', salary: 4500 },
    { id: 2, name: 'Maria Garcia', role: 'Waitress', email: 'maria@restaurant.com', phone: '+1 234 567 8901', department: 'Service', status: 'active', hireDate: '2023-01-20', salary: 2800 },
    { id: 3, name: 'Robert Chen', role: 'Sous Chef', email: 'robert@restaurant.com', phone: '+1 234 567 8902', department: 'Kitchen', status: 'on-leave', hireDate: '2022-08-10', salary: 3800 },
    { id: 4, name: 'Sarah Miller', role: 'Bartender', email: 'sarah@restaurant.com', phone: '+1 234 567 8903', department: 'Bar', status: 'active', hireDate: '2023-03-05', salary: 3200 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    gsap.from('.staff-card', {
      duration: 0.5,
      y: 20,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const departments = ['all', 'Kitchen', 'Service', 'Bar', 'Management', 'Cleaning'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600">Manage restaurant employees and staff</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Staff</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 animate-slideDown">
          <h3 className="text-lg font-semibold mb-4">Add New Staff Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Role/Position"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">Select Department</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Salary"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Add Staff
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="staff-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-3" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">{member.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="h-4 w-4 mr-3" />
                <span className="text-sm">{member.department}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-3" />
                <span className="text-sm">Hired: {member.hireDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p className="text-lg font-bold text-gray-800">${member.salary}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}