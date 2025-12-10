'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Store, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Users, 
  TrendingUp, 
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Navigation
} from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  managerName: string;
  status: 'active' | 'maintenance' | 'closed' | 'pending';
  revenue: number;
  totalStaff: number;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function Branches() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 1,
      name: 'Downtown Main',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (212) 555-0100',
      managerName: 'John Smith',
      status: 'active',
      revenue: 125000,
      totalStaff: 25,
      openingHours: {
        monday: '9:00 AM - 10:00 PM',
        tuesday: '9:00 AM - 10:00 PM',
        wednesday: '9:00 AM - 10:00 PM',
        thursday: '9:00 AM - 11:00 PM',
        friday: '9:00 AM - 12:00 AM',
        saturday: '10:00 AM - 12:00 AM',
        sunday: '10:00 AM - 9:00 PM'
      },
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: 'Uptown Plaza',
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      phone: '+1 (212) 555-0200',
      managerName: 'Sarah Johnson',
      status: 'active',
      revenue: 98000,
      totalStaff: 18,
      openingHours: {
        monday: '10:00 AM - 9:00 PM',
        tuesday: '10:00 AM - 9:00 PM',
        wednesday: '10:00 AM - 9:00 PM',
        thursday: '10:00 AM - 10:00 PM',
        friday: '10:00 AM - 11:00 PM',
        saturday: '11:00 AM - 11:00 PM',
        sunday: '11:00 AM - 8:00 PM'
      },
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    {
      id: 3,
      name: 'Riverside Branch',
      address: '789 River Road',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      phone: '+1 (718) 555-0300',
      managerName: 'Michael Brown',
      status: 'maintenance',
      revenue: 75000,
      totalStaff: 15,
      openingHours: {
        monday: '11:00 AM - 9:00 PM',
        tuesday: '11:00 AM - 9:00 PM',
        wednesday: '11:00 AM - 9:00 PM',
        thursday: '11:00 AM - 10:00 PM',
        friday: '11:00 AM - 11:00 PM',
        saturday: '12:00 PM - 11:00 PM',
        sunday: 'Closed'
      }
    },
    {
      id: 4,
      name: 'Westside Outlet',
      address: '321 Broadway',
      city: 'Queens',
      state: 'NY',
      zipCode: '11101',
      phone: '+1 (347) 555-0400',
      managerName: 'Emily Davis',
      status: 'pending',
      revenue: 0,
      totalStaff: 0,
      openingHours: {
        monday: 'Coming Soon',
        tuesday: 'Coming Soon',
        wednesday: 'Coming Soon',
        thursday: 'Coming Soon',
        friday: 'Coming Soon',
        saturday: 'Coming Soon',
        sunday: 'Coming Soon'
      }
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    managerName: '',
  });

  useEffect(() => {
    gsap.from('.branch-card', {
      duration: 0.6,
      y: 30,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || branch.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          label: 'Active'
        };
      case 'maintenance':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: Clock,
          label: 'Maintenance'
        };
      case 'closed':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: XCircle,
          label: 'Closed'
        };
      case 'pending':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: Clock,
          label: 'Pending'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.address && newBranch.city && newBranch.state) {
      const newBranchObj: Branch = {
        id: branches.length + 1,
        ...newBranch,
        status: 'pending',
        revenue: 0,
        totalStaff: 0,
        openingHours: {
          monday: '9:00 AM - 10:00 PM',
          tuesday: '9:00 AM - 10:00 PM',
          wednesday: '9:00 AM - 10:00 PM',
          thursday: '9:00 AM - 11:00 PM',
          friday: '9:00 AM - 12:00 AM',
          saturday: '10:00 AM - 12:00 AM',
          sunday: '10:00 AM - 9:00 PM'
        }
      };
      setBranches([...branches, newBranchObj]);
      setNewBranch({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        managerName: '',
      });
      setShowAddForm(false);
    }
  };

  const updateBranchStatus = (id: number, newStatus: Branch['status']) => {
    setBranches(branches.map(branch =>
      branch.id === id ? { ...branch, status: newStatus } : branch
    ));
  };

  const deleteBranch = (id: number) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const stats = [
    {
      label: 'Total Branches',
      value: branches.length,
      icon: Store,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Active Branches',
      value: branches.filter(b => b.status === 'active').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Total Revenue',
      value: `$${branches.reduce((sum, branch) => sum + branch.revenue, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Total Staff',
      value: branches.reduce((sum, branch) => sum + branch.totalStaff, 0),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Branch Controller</h1>
          <p className="text-gray-600">Manage all your restaurant branches and locations</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Branch</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Branch Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slideDown">
          <h3 className="text-lg font-semibold mb-4">Add New Branch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
              <input
                type="text"
                value={newBranch.name}
                onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                placeholder="e.g., Downtown Main"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={newBranch.address}
                onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                placeholder="Street Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={newBranch.city}
                onChange={(e) => setNewBranch({...newBranch, city: e.target.value})}
                placeholder="City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={newBranch.state}
                  onChange={(e) => setNewBranch({...newBranch, state: e.target.value})}
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={newBranch.zipCode}
                  onChange={(e) => setNewBranch({...newBranch, zipCode: e.target.value})}
                  placeholder="ZIP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={newBranch.phone}
                onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                placeholder="+1 (123) 456-7890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
              <input
                type="text"
                value={newBranch.managerName}
                onChange={(e) => setNewBranch({...newBranch, managerName: e.target.value})}
                placeholder="Branch Manager"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBranch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Branch
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search branches by name, address, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => {
          const statusConfig = getStatusConfig(branch.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={branch.id} className="branch-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Branch Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Store className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color} border ${statusConfig.borderColor}`}>
                          <StatusIcon className="inline h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedBranch(branch)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{branch.address}</p>
                      <p className="text-sm">{branch.city}, {branch.state} {branch.zipCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <span className="font-medium">{branch.managerName}</span>
                      <p className="text-sm">Manager • {branch.totalStaff} staff members</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
                    <p className="text-xl font-bold text-gray-800">${branch.revenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Opening Hours</p>
                    <p className="text-sm font-medium text-gray-800">Today: {branch.openingHours.monday}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedBranch(branch)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                  </div>
                  <button
                    onClick={() => deleteBranch(branch.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <Store className="h-6 w-6 mr-2" />
                  {selectedBranch.name} Details
                </h3>
                <button
                  onClick={() => setSelectedBranch(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">Branch Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address</p>
                        <p className="font-medium">{selectedBranch.address}</p>
                        <p className="text-gray-600">{selectedBranch.city}, {selectedBranch.state} {selectedBranch.zipCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Contact</p>
                        <p className="font-medium">{selectedBranch.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Manager</p>
                        <p className="font-medium">{selectedBranch.managerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusConfig(selectedBranch.status).bgColor
                        } ${
                          getStatusConfig(selectedBranch.status).color
                        }`}>
                          {getStatusConfig(selectedBranch.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Stats */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Financial Overview</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Revenue</p>
                          <p className="text-2xl font-bold text-gray-800">${selectedBranch.revenue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-500">Total Staff</p>
                          <p className="text-lg font-bold text-gray-800">{selectedBranch.totalStaff}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-sm text-gray-500">Avg. Order</p>
                          <p className="text-lg font-bold text-gray-800">$45</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Opening Hours */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      {Object.entries(selectedBranch.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateBranchStatus(selectedBranch.id, 'active')}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                          selectedBranch.status === 'active'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5 mb-1" />
                        <span className="text-sm">Set Active</span>
                      </button>
                      <button
                        onClick={() => updateBranchStatus(selectedBranch.id, 'maintenance')}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                          selectedBranch.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Clock className="h-5 w-5 mb-1" />
                        <span className="text-sm">Maintenance</span>
                      </button>
                      <button
                        onClick={() => updateBranchStatus(selectedBranch.id, 'closed')}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                          selectedBranch.status === 'closed'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <XCircle className="h-5 w-5 mb-1" />
                        <span className="text-sm">Close Branch</span>
                      </button>
                      <button className="p-3 rounded-lg bg-blue-100 text-blue-700 flex flex-col items-center justify-center hover:bg-blue-200">
                        <Navigation className="h-5 w-5 mb-1" />
                        <span className="text-sm">Get Directions</span>
                      </button>
                    </div>
                  </div>

                  {/* Advanced Actions */}
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-3">
                      <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Generate Report
                      </button>
                      <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        View Staff Schedule
                      </button>
                      <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Edit Branch Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview (Optional) */}
              {selectedBranch.coordinates && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Location</h4>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-8 text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700 mb-2">📍 {selectedBranch.address}</p>
                    <p className="text-gray-600 text-sm mb-4">Coordinates: {selectedBranch.coordinates.lat}, {selectedBranch.coordinates.lng}</p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View on Map
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredBranches.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No branches found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or add a new branch</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Branch
          </button>
        </div>
      )}
    </div>
  );
}