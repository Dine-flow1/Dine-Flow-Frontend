// src/components/manager/SectionNavigation.tsx
interface SectionNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const SectionNavigation = ({ activeSection, onSectionChange }: SectionNavigationProps) => {
  const sections = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'menu', name: 'Menu', icon: '🍽️' },
    { id: 'tables', name: 'Tables', icon: '🪑' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' }
  ];

  return (
    <div className="flex space-x-1 bg-white rounded-2xl p-2 shadow-sm border border-gray-200 mb-8">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeSection === section.id
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <span>{section.icon}</span>
          <span>{section.name}</span>
        </button>
      ))}
    </div>
  );
};