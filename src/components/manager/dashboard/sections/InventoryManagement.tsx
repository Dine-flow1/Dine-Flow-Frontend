'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Package, AlertCircle, TrendingDown, CheckCircle, Plus, Filter, RefreshCw } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: 'vegetables' | 'meat' | 'dairy' | 'beverages' | 'dry-goods' | 'spices';
  currentStock: number;
  minStock: number;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'units';
  lastUpdated: string;
  supplier: string;
  pricePerUnit: number;
  status: 'adequate' | 'low' | 'out-of-stock';
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Chicken Breast', category: 'meat', currentStock: 15, minStock: 20, unit: 'kg', lastUpdated: 'Today', supplier: 'Meat Suppliers Inc.', pricePerUnit: 8.99, status: 'low' },
    { id: 2, name: 'Fresh Tomatoes', category: 'vegetables', currentStock: 25, minStock: 15, unit: 'kg', lastUpdated: 'Today', supplier: 'Local Farm', pricePerUnit: 2.99, status: 'adequate' },
    { id: 3, name: 'Mozzarella Cheese', category: 'dairy', currentStock: 8, minStock: 10, unit: 'kg', lastUpdated: 'Yesterday', supplier: 'Dairy Co.', pricePerUnit: 6.50, status: 'low' },
    { id: 4, name: 'Red Wine', category: 'beverages', currentStock: 12, minStock: 8, unit: 'l', lastUpdated: '2 days ago', supplier: 'Wine Importers', pricePerUnit: 12.99, status: 'adequate' },
    { id: 5, name: 'Olive Oil', category: 'dry-goods', currentStock: 5, minStock: 10, unit: 'l', lastUpdated: 'Today', supplier: 'Oil Distributors', pricePerUnit: 15.99, status: 'low' },
    { id: 6, name: 'Basil', category: 'spices', currentStock: 2, minStock: 5, unit: 'kg', lastUpdated: '3 days ago', supplier: 'Herb Garden', pricePerUnit: 4.99, status: 'low' },
    { id: 7, name: 'Beef', category: 'meat', currentStock: 30, minStock: 25, unit: 'kg', lastUpdated: 'Today', supplier: 'Meat Suppliers Inc.', pricePerUnit: 12.99, status: 'adequate' },
    { id: 8, name: 'Lettuce', category: 'vegetables', currentStock: 18, minStock: 12, unit: 'kg', lastUpdated: 'Today', supplier: 'Local Farm', pricePerUnit: 3.49, status: 'adequate' },
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    currentStock: '',
    minStock: '',
    unit: 'kg',
    supplier: '',
    pricePerUnit: '',
  });

  useEffect(() => {
    gsap.from('.inventory-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const categories = ['all', 'vegetables', 'meat', 'dairy', 'beverages', 'dry-goods', 'spices'];
  const statuses = ['all', 'adequate', 'low', 'out-of-stock'];

  const filteredItems = inventory.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const updateStock = (id: number, newStock: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { 
        ...item, 
        currentStock: newStock,
        status: newStock === 0 ? 'out-of-stock' : newStock <= item.minStock ? 'low' : 'adequate',
        lastUpdated: 'Now'
      } : item
    ));
  };

  const addInventoryItem = () => {
    if (newItem.name && newItem.category && newItem.currentStock) {
      const currentStockNum = parseFloat(newItem.currentStock);
      const minStockNum = parseFloat(newItem.minStock) || 0;
      
      const newInventoryItem: InventoryItem = {
        id: inventory.length + 1,
        name: newItem.name,
        category: newItem.category as any,
        currentStock: currentStockNum,
        minStock: minStockNum,
        unit: newItem.unit as any,
        lastUpdated: 'Now',
        supplier: newItem.supplier || 'Unknown',
        pricePerUnit: parseFloat(newItem.pricePerUnit) || 0,
        status: currentStockNum === 0 ? 'out-of-stock' : currentStockNum <= minStockNum ? 'low' : 'adequate'
      };
      
      setInventory([newInventoryItem, ...inventory]);
      setNewItem({
        name: '',
        category: '',
        currentStock: '',
        minStock: '',
        unit: 'kg',
        supplier: '',
        pricePerUnit: '',
      });
      setShowAddItem(false);
    }
  };

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => item.status === 'low').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.pricePerUnit), 0),
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'adequate': return { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
      case 'low': return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: AlertCircle };
      case 'out-of-stock': return { color: 'text-red-600', bgColor: 'bg-red-50', icon: TrendingDown };
      default: return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Package };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600">Track and manage restaurant inventory levels</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddItem(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Items', value: stats.totalItems, icon: Package, color: 'text-blue-600' },
          { label: 'Low Stock', value: stats.lowStock, icon: AlertCircle, color: 'text-yellow-600' },
          { label: 'Out of Stock', value: stats.outOfStock, icon: TrendingDown, color: 'text-red-600' },
          { label: 'Total Value', value: `$${stats.totalValue.toFixed(2)}`, icon: Package, color: 'text-green-600' },
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 mr-3">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-3">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : 
                     status === 'adequate' ? 'Adequate' :
                     status === 'low' ? 'Low Stock' : 'Out of Stock'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Item Name</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Current Stock</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Min. Stock</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Supplier</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Last Updated</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.pricePerUnit}/{item.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-800">{item.currentStock} {item.unit}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'adequate' ? 'bg-green-500' :
                              item.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${Math.min(100, (item.currentStock / (item.minStock * 2)) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-800">{item.minStock} {item.unit}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit ${statusConfig.bgColor} ${statusConfig.color}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {item.status === 'adequate' ? 'Adequate' : 
                         item.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-700">{item.supplier}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{item.lastUpdated}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateStock(item.id, item.currentStock + 1)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => updateStock(item.id, Math.max(0, item.currentStock - 1))}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                        >
                          -1
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add Inventory Item</h3>
                <button
                  onClick={() => setShowAddItem(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <TrendingDown className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Chicken Breast"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                    <input
                      type="number"
                      value={newItem.currentStock}
                      onChange={(e) => setNewItem({...newItem, currentStock: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 20"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock</label>
                    <input
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 10"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                      <option value="units">units</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($)</label>
                    <input
                      type="number"
                      value={newItem.pricePerUnit}
                      onChange={(e) => setNewItem({...newItem, pricePerUnit: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 8.99"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Supplier name"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addInventoryItem}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Low Stock Alerts */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
          Low Stock Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inventory
            .filter(item => item.status === 'low' || item.status === 'out-of-stock')
            .map(item => (
              <div key={item.id} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === 'low' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium">{item.currentStock} {item.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum:</span>
                    <span className="font-medium">{item.minStock} {item.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{item.supplier}</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Order Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}