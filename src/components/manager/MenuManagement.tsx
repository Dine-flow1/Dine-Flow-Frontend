// src/components/manager/MenuManagement.tsx
'use client';

import { FoodItem } from '../../types/manager';
import { useState } from 'react';

interface MenuManagementProps {
  items: FoodItem[];
  onAddItem: (item: Omit<FoodItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<FoodItem>) => void;
  onDeleteItem: (id: string) => void;
}

export const MenuManagement = ({ items, onAddItem, onEditItem, onDeleteItem }: MenuManagementProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

 const categories = ['all'].concat(Array.from(new Set(items.map(item => item.category))));

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '🍽️',
    preparationTime: 15,
    ingredients: [''],
    isAvailable: true
  });

  const handleAddItem = () => {
    onAddItem(newItem);
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '🍽️',
      preparationTime: 15,
      ingredients: [''],
      isAvailable: true
    });
  };

  const handleEditItem = () => {
    if (editingItem) {
      onEditItem(editingItem.id, newItem);
      setEditingItem(null);
      setNewItem({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '🍽️',
        preparationTime: 15,
        ingredients: [''],
        isAvailable: true
      });
    }
  };

  const addIngredient = () => {
    setNewItem(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setNewItem(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Menu Management</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Food Item</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="text-4xl">{item.image}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setNewItem({ ...item });
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{item.category}</p>
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">${item.price}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preparation Time (min)</label>
                <input
                  type="number"
                  value={newItem.preparationTime}
                  onChange={(e) => setNewItem(prev => ({ ...prev, preparationTime: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                <div className="space-y-2">
                  {newItem.ingredients.map((ingredient, index) => (
                    <input
                      key={index}
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ))}
                  <button
                    onClick={addIngredient}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    + Add Another Ingredient
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingItem ? handleEditItem : handleAddItem}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};