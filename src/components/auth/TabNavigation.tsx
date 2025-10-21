import { AuthTab } from '@/types/auth';

interface TabNavigationProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 p-1 mb-8 bg-gray-100 rounded-xl">
      <button
        className={`flex-1 py-3 px-4 border-none bg-transparent rounded-lg cursor-pointer text-base font-medium transition-all duration-300 ${
          activeTab === 'signin' 
            ? 'bg-white text-[#6b2c3e] shadow-lg' 
            : 'text-gray-600'
        }`}
        onClick={() => onTabChange('signin')}
        
      >
    
        Sign In
      </button>
      <button
        className={`flex-1 py-3 px-4 border-none bg-transparent rounded-lg cursor-pointer text-base font-medium transition-all duration-300 ${
          activeTab === 'signup' 
            ? 'bg-white text-[#6b2c3e] shadow-lg' 
            : 'text-gray-600'
        }`}
        onClick={() => onTabChange('signup')}
      >
        Sign Up
      </button>
    </div>
  );
}