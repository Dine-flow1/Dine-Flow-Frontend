'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { UserPlus, Search, Edit, Trash2, Check, X } from 'lucide-react';

interface Manager {
  id: number;
  name: string;
  email: string;
  restaurant: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export function Managers() {
  const [managers, setManagers] = useState<Manager[]>([
    { id: 1, name: 'John Smith', email: 'john@restaurant.com', restaurant: 'Main Branch', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@restaurant.com', restaurant: 'Downtown Branch', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@restaurant.com', restaurant: 'Uptown Branch', status: 'inactive', joinDate: '2023-03-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newManager, setNewManager] = useState({ name: '', email: '', restaurant: '' });

  useEffect(() => {
    gsap.from('.manager-card', {
      duration: 0.5,
      y: 20,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const filteredManagers = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddManager = () => {
    if (newManager.name && newManager.email && newManager.restaurant) {
      const newManagerObj: Manager = {
        id: managers.length + 1,
        ...newManager,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setManagers([...managers, newManagerObj]);
      setNewManager({ name: '', email: '', restaurant: '' });
      setShowAddForm(false);
    }
  };

  const toggleStatus = (id: number) => {
    setManagers(managers.map(manager =>
      manager.id === id
        ? { ...manager, status: manager.status === 'active' ? 'inactive' : 'active' }
        : manager
    ));
  };

  const deleteManager = (id: number) => {
    setManagers(managers.filter(manager => manager.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Managers</h1>
          <p className="text-gray-600">Manage and oversee restaurant managers</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Manager</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 animate-slideDown">
          <h3 className="text-lg font-semibold mb-4">Add New Manager</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newManager.name}
              onChange={(e) => setNewManager({...newManager, name: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newManager.email}
              onChange={(e) => setNewManager({...newManager, email: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Restaurant Branch"
              value={newManager.restaurant}
              onChange={(e) => setNewManager({...newManager, restaurant: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              onClick={handleAddManager}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Manager
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Restaurant</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Join Date</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {manager.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{manager.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{manager.email}</td>
                  <td className="py-4 px-6">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {manager.restaurant}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(manager.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        manager.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {manager.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{manager.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteManager(manager.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}