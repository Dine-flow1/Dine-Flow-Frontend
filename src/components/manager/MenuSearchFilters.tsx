interface MenuSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const MenuSearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}: MenuSearchFiltersProps) => {
  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search food items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category === 'all' ? 'All Categories' : category}
          </option>
        ))}
      </select>
    </div>
  );
};