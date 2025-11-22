interface SectionNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  restaurantStatus?: string;
}

export function SectionNavigation({ 
  activeSection, 
  onSectionChange, 
  restaurantStatus 
}: SectionNavigationProps) {
  const sections = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'menu', name: 'Menu', icon: '🍽️' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'tables', name: 'Tables', icon: '🪑' },
    { id: 'users', name: 'Users', icon: '👥' },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeSection === section.id
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </nav>
    </div>
  );
}