"use client";

interface AutoPlayStatusProps {
  isAutoPlaying: boolean;
}

export default function AutoPlayStatus({ isAutoPlaying }: AutoPlayStatusProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-300'}`} />
      <span className="text-xs text-gray-500">
        {isAutoPlaying ? 'Auto-playing' : 'Paused'}
      </span>
    </div>
  );
}