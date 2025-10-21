import { AuthTab } from '@/types/auth';

interface AuthHeaderProps {
  activeTab: AuthTab;
}

export default function AuthHeader({ activeTab }: AuthHeaderProps) {
  return (
    <div className="bg-linear-to-br from-[#6b2c3e] to-[#4a1f2d] px-8 py-10 text-center text-white">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold border-2 rounded-full bg-white/15 border-white/30">
          D
        </div>
        <div className="text-2xl font-semibold tracking-wide">DINEFLOW</div>
      </div>
      <h2 className="text-xl font-normal opacity-90">
        {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
      </h2>
    </div>
  );
}