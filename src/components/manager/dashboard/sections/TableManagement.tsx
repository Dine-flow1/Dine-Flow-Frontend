'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Table as TableIcon, Users, Clock, CheckCircle, XCircle, Plus, Eye } from 'lucide-react';

interface RestaurantTable {
  id: number;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning' | 'out-of-service';
  currentGuests?: number;
  orderId?: number;
  reservationTime?: string;
  waiter?: string;
  estimatedDuration?: number;
}

export function TableManagement() {
  const [tables, setTables] = useState<RestaurantTable[]>([
    { id: 1, number: 'Table 1', capacity: 4, status: 'available' },
    { id: 2, number: 'Table 2', capacity: 2, status: 'occupied', currentGuests: 2, orderId: 101, waiter: 'John', estimatedDuration: 45 },
    { id: 3, number: 'Table 3', capacity: 6, status: 'reserved', reservationTime: '7:30 PM' },
    { id: 4, number: 'Table 4', capacity: 4, status: 'occupied', currentGuests: 4, orderId: 102, waiter: 'Sarah', estimatedDuration: 60 },
    { id: 5, number: 'Table 5', capacity: 2, status: 'cleaning' },
    { id: 6, number: 'Table 6', capacity: 8, status: 'available' },
    { id: 7, number: 'Table 7', capacity: 4, status: 'out-of-service' },
    { id: 8, number: 'Table 8', capacity: 2, status: 'occupied', currentGuests: 1, orderId: 103, waiter: 'Mike', estimatedDuration: 30 },
  ]);

  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTable, setNewTable] = useState({ number: '', capacity: 4 });

  useEffect(() => {
    gsap.from('.table-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, label: 'Available' };
      case 'occupied':
        return { color: 'text-red-600', bgColor: 'bg-red-50', icon: Users, label: 'Occupied' };
      case 'reserved':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Clock, label: 'Reserved' };
      case 'cleaning':
        return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Clock, label: 'Cleaning' };
      case 'out-of-service':
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: XCircle, label: 'Out of Service' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: TableIcon, label: 'Unknown' };
    }
  };

  const updateTableStatus = (id: number, newStatus: RestaurantTable['status']) => {
    setTables(tables.map(table => 
      table.id === id ? { ...table, status: newStatus } : table
    ));
  };

  const addTable = () => {
    if (newTable.number && newTable.capacity) {
      const newTableObj: RestaurantTable = {
        id: tables.length + 1,
        number: newTable.number,
        capacity: newTable.capacity,
        status: 'available'
      };
      setTables([...tables, newTableObj]);
      setNewTable({ number: '', capacity: 4 });
      setShowAddModal(false);
    }
  };

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    capacity: tables.reduce((sum, table) => sum + table.capacity, 0),
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Table Management</h1>
          <p className="text-gray-600">Monitor and manage restaurant table status in real-time</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Table</span>
        </button>
      </div>

      {/* Table Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Tables', value: stats.total, icon: TableIcon, color: 'text-blue-600' },
          { label: 'Available Now', value: stats.available, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Currently Occupied', value: stats.occupied, icon: Users, color: 'text-red-600' },
          { label: 'Total Capacity', value: stats.capacity, icon: Users, color: 'text-purple-600' },
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

      {/* Floor Plan Visualization */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-6">Restaurant Floor Plan</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {tables.map((table) => {
            const statusConfig = getStatusConfig(table.status);
            const Icon = statusConfig.icon;

            return (
              <div
                key={table.id}
                className={`table-card p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                  table.status === 'available' ? 'border-green-200 bg-green-50' :
                  table.status === 'occupied' ? 'border-red-200 bg-red-50' :
                  table.status === 'reserved' ? 'border-yellow-200 bg-yellow-50' :
                  table.status === 'cleaning' ? 'border-blue-200 bg-blue-50' :
                  'border-gray-200 bg-gray-50'
                }`}
                onClick={() => setSelectedTable(table)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TableIcon className={`h-5 w-5 ${statusConfig.color}`} />
                    <span className="font-bold text-gray-800">{table.number}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                    <Icon className="inline h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold">{table.capacity} seats</span>
                  </div>
                  
                  {table.currentGuests && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-semibold">{table.currentGuests}/{table.capacity}</span>
                    </div>
                  )}

                  {table.waiter && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Waiter:</span>
                      <span className="font-semibold">{table.waiter}</span>
                    </div>
                  )}

                  {table.estimatedDuration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="font-semibold">{table.estimatedDuration} min</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Legend */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-4">Table Status Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['available', 'occupied', 'reserved', 'cleaning', 'out-of-service'].map((status) => {
            const config = getStatusConfig(status);
            const Icon = config.icon;
            return (
              <div key={status} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div>
                  <p className="font-medium">{config.label}</p>
                  <p className="text-sm text-gray-500">
                    {tables.filter(t => t.status === status).length} tables
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Table</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={newTable.number}
                    onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                    placeholder="e.g., Table 9"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Table Capacity
                  </label>
                  <select
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({...newTable, capacity: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[2, 4, 6, 8, 10].map(num => (
                      <option key={num} value={num}>{num} seats</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addTable}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Table Details</h3>
                <button
                  onClick={() => setSelectedTable(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-500">Table Information</p>
                    <div className="mt-3 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Table Number:</span>
                        <span className="font-bold">{selectedTable.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-bold">{selectedTable.capacity} seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusConfig(selectedTable.status).bgColor
                        } ${
                          getStatusConfig(selectedTable.status).color
                        }`}>
                          {getStatusConfig(selectedTable.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-3">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateTableStatus(selectedTable.id, 'available')}
                        className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        Mark Available
                      </button>
                      <button
                        onClick={() => updateTableStatus(selectedTable.id, 'occupied')}
                        className="p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Mark Occupied
                      </button>
                      <button
                        onClick={() => updateTableStatus(selectedTable.id, 'cleaning')}
                        className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Needs Cleaning
                      </button>
                      <button
                        onClick={() => updateTableStatus(selectedTable.id, 'out-of-service')}
                        className="p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Out of Service
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-500">Current Status Details</p>
                    <div className="mt-3 space-y-3">
                      {selectedTable.currentGuests && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Guests:</span>
                          <span className="font-bold">{selectedTable.currentGuests}</span>
                        </div>
                      )}
                      {selectedTable.orderId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order ID:</span>
                          <span className="font-bold">#{selectedTable.orderId}</span>
                        </div>
                      )}
                      {selectedTable.waiter && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigned Waiter:</span>
                          <span className="font-bold">{selectedTable.waiter}</span>
                        </div>
                      )}
                      {selectedTable.estimatedDuration && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Duration:</span>
                          <span className="font-bold">{selectedTable.estimatedDuration} min</span>
                        </div>
                      )}
                      {selectedTable.reservationTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reservation Time:</span>
                          <span className="font-bold">{selectedTable.reservationTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedTable.status === 'occupied' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-800 mb-2">Active Order Details</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-700">Order Started:</span>
                          <span className="font-medium">30 minutes ago</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-700">Items Ordered:</span>
                          <span className="font-medium">3 items</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-700">Order Total:</span>
                          <span className="font-medium">$65.50</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => setSelectedTable(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit table
                    setSelectedTable(null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Table
                </button>
                <button
                  onClick={() => {
                    setTables(tables.filter(t => t.id !== selectedTable.id));
                    setSelectedTable(null);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}