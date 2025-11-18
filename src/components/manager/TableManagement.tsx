// src/components/manager/TableManagement.tsx
'use client';

import { Table } from '../../types/manager';
import { useState } from 'react';

interface TableManagementProps {
  tables: Table[];
  onAssignTable: (tableId: string, orderId: string) => void;
  onUpdateTableStatus: (tableId: string, status: Table['status']) => void;
  onAddTable: (table: Omit<Table, 'id'>) => void;
  onRemoveTable: (tableId: string) => void;
}

export const TableManagement = ({ 
  tables, 
  onAssignTable, 
  onUpdateTableStatus, 
  onAddTable, 
  onRemoveTable 
}: TableManagementProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTable, setNewTable] = useState({
    number: tables.length + 1,
    capacity: 4,
    status: 'available' as Table['status']
  });

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Table['status']) => {
    switch (status) {
      case 'available': return '✅';
      case 'occupied': return '🔄';
      case 'reserved': return '⏰';
      default: return '❓';
    }
  };

  const handleAddTable = () => {
    onAddTable(newTable);
    setIsAddModalOpen(false);
    setNewTable({
      number: tables.length + 2,
      capacity: 4,
      status: 'available'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Table Management</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Table</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🍽️</span>
                <div>
                  <h4 className="font-bold text-gray-900">Table {table.number}</h4>
                  <p className="text-sm text-gray-600">{table.capacity} seats</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(table.status)}`}>
                {getStatusIcon(table.status)} {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <select
                value={table.status}
                onChange={(e) => onUpdateTableStatus(table.id, e.target.value as Table['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>

              {table.status === 'occupied' && (
                <input
                  type="text"
                  placeholder="Order ID"
                  onChange={(e) => onAssignTable(table.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              )}

              <button
                onClick={() => onRemoveTable(table.id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Remove Table
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Table Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Table</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Table Number</label>
                <input
                  type="number"
                  value={newTable.number}
                  onChange={(e) => setNewTable(prev => ({ ...prev, number: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Status</label>
                <select
                  value={newTable.status}
                  onChange={(e) => setNewTable(prev => ({ ...prev, status: e.target.value as Table['status'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTable}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};