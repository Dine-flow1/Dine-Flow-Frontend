'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { UtensilsCrossed, CheckCircle, XCircle, AlertCircle, Edit, Plus, Tag, Clock, DollarSign } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  popular: boolean;
  preparationTime: number;
  description: string;
  ingredients: string[];
  lastUpdated: string;
  specialNote?: string;
}

export function MenuUpdates() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Grilled Salmon', category: 'Main Course', price: 24.99, available: true, popular: true, preparationTime: 20, description: 'Fresh salmon with lemon butter sauce', ingredients: ['Salmon', 'Lemon', 'Butter', 'Herbs'], lastUpdated: 'Today' },
    { id: 2, name: 'Caesar Salad', category: 'Salads', price: 12.99, available: true, popular: false, preparationTime: 10, description: 'Classic Caesar with homemade dressing', ingredients: ['Romaine', 'Croutons', 'Parmesan'], lastUpdated: 'Today' },
    { id: 3, name: 'Ribeye Steak', category: 'Main Course', price: 32.99, available: false, popular: true, preparationTime: 25, description: 'Premium steak with mashed potatoes', ingredients: ['Beef', 'Potatoes', 'Herbs'], lastUpdated: 'Yesterday', specialNote: 'Out of stock' },
    { id: 4, name: 'Margherita Pizza', category: 'Italian', price: 18.99, available: true, popular: true, preparationTime: 15, description: 'Classic pizza with fresh mozzarella', ingredients: ['Dough', 'Tomato', 'Mozzarella', 'Basil'], lastUpdated: 'Today' },
    { id: 5, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.99, available: true, popular: false, preparationTime: 12, description: 'Warm chocolate cake with vanilla ice cream', ingredients: ['Chocolate', 'Flour', 'Eggs', 'Ice Cream'], lastUpdated: '2 days ago' },
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    preparationTime: '',
  });

  useEffect(() => {
    gsap.from('.menu-item-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const categories = ['all', 'Main Course', 'Salads', 'Italian', 'Desserts', 'Beverages', 'Appetizers'];

  const filteredItems = menuItems.filter(item =>
    filterCategory === 'all' || item.category === filterCategory
  );

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const togglePopular = (id: number) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, popular: !item.popular } : item
    ));
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const newMenuItem: MenuItem = {
        id: menuItems.length + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        available: true,
        popular: false,
        preparationTime: parseInt(newItem.preparationTime) || 15,
        description: newItem.description,
        ingredients: [],
        lastUpdated: 'Now'
      };
      setMenuItems([newMenuItem, ...menuItems]);
      setNewItem({ name: '', category: '', price: '', description: '', preparationTime: '' });
      setShowAddItem(false);
    }
  };

  const updateMenuItem = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
    }
  };

  const stats = {
    total: menuItems.length,
    available: menuItems.filter(item => item.available).length,
    popular: menuItems.filter(item => item.popular).length,
    categories: new Set(menuItems.map(item => item.category)).size,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Menu Updates</h1>
          <p className="text-gray-600">Manage menu items, availability, and specials</p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Menu Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Items', value: stats.total, icon: UtensilsCrossed, color: 'text-blue-600' },
          { label: 'Available Now', value: stats.available, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Popular Items', value: stats.popular, icon: Tag, color: 'text-yellow-600' },
          { label: 'Categories', value: stats.categories, icon: UtensilsCrossed, color: 'text-purple-600' },
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

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filterCategory === category
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Item Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-bold text-green-600">${item.price}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Item Details */}
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">Prep time: {item.preparationTime} min</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Tag className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{item.ingredients.length} ingredients</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">Last updated: {item.lastUpdated}</span>
                </div>
              </div>

              {/* Special Note */}
              {item.specialNote && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {item.specialNote}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    item.available
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </button>
                <button
                  onClick={() => togglePopular(item.id)}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    item.popular
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.popular ? 'Popular' : 'Mark Popular'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Menu Item</h3>
                <button
                  onClick={() => setShowAddItem(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
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
                      placeholder="e.g., Grilled Salmon"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="24.99"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
                    <input
                      type="number"
                      value={newItem.preparationTime}
                      onChange={(e) => setNewItem({...newItem, preparationTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="15"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Brief description of the menu item..."
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
                    onClick={addMenuItem}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add to Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Menu Item</h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
                    <input
                      type="number"
                      value={editingItem.preparationTime}
                      onChange={(e) => setEditingItem({...editingItem, preparationTime: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleAvailability(editingItem.id)}
                    className={`flex-1 py-3 rounded-lg font-medium ${
                      editingItem.available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {editingItem.available ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                  <button
                    onClick={() => togglePopular(editingItem.id)}
                    className={`flex-1 py-3 rounded-lg font-medium ${
                      editingItem.popular
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {editingItem.popular ? 'Remove Popular' : 'Mark as Popular'}
                  </button>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateMenuItem}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specials Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Specials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800">Chef's Special</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Featured</span>
            </div>
            <p className="text-sm text-gray-600">Grilled Salmon - $24.99</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800">Happy Hour</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">5-7 PM</span>
            </div>
            <p className="text-sm text-gray-600">50% off all cocktails</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800">Weekly Deal</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">This Week</span>
            </div>
            <p className="text-sm text-gray-600">Buy 1 Pizza, Get 1 Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}