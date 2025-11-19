'use client';
import { FoodItem } from '../../types/manager';
import { useState } from 'react';
import { MenuSearchFilters } from './MenuSearchFilters';
import { FoodItemsGrid } from './FoodItemsGrid';
import { FoodItemModal } from './FoodItemModal';

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
    resetNewItem();
  };

  const handleEditItem = () => {
    if (editingItem) {
      onEditItem(editingItem.id, newItem);
      setEditingItem(null);
      resetNewItem();
    }
  };

  const resetNewItem = () => {
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

  const handleEditClick = (item: FoodItem) => {
    setEditingItem(item);
    setNewItem({ ...item });
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

      <MenuSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <FoodItemsGrid
        items={filteredItems}
        onEditItem={handleEditClick}
        onDeleteItem={onDeleteItem}
      />

      {(isAddModalOpen || editingItem) && (
        <FoodItemModal
          isEditing={!!editingItem}
          newItem={newItem}
          onNewItemChange={setNewItem}
          onSave={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingItem(null);
            resetNewItem();
          }}
        />
      )}
    </div>
  );
};