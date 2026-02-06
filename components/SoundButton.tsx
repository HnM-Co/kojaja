import React from 'react';
import { SoundItem } from '../types';
import { Play, Pause } from 'lucide-react';

interface SoundButtonProps {
  sound: SoundItem;
  isActive: boolean;
  onClick: (sound: SoundItem) => void;
}

const SoundButton: React.FC<SoundButtonProps> = ({ sound, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(sound)}
      className={`
        group relative flex flex-col items-center justify-center 
        p-4 h-36 w-full rounded-3xl transition-all duration-500 ease-out
        border backdrop-blur-md shadow-lg overflow-hidden
        ${isActive 
          ? 'border-white/60 bg-white/40 scale-105 shadow-blue-300/50 shadow-2xl ring-2 ring-white/50' 
          : 'border-white/30 bg-white/20 hover:bg-white/30 hover:scale-102 hover:shadow-xl'
        }
      `}
    >
      {/* Internal Gradient for Active State */}
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 bg-gradient-to-br ${sound.gradient}
          ${isActive ? 'opacity-20' : 'group-hover:opacity-10'}
        `} 
      />

      {/* Icon Container */}
      <div className={`
        relative z-10 p-3 rounded-2xl transition-all duration-500
        ${isActive 
          ? 'bg-white text-gray-800 shadow-lg scale-110' 
          : 'bg-white/40 text-gray-700 group-hover:bg-white/60'
        }
      `}>
        {sound.icon}
      </div>

      {/* Label */}
      <span className={`
        relative z-10 mt-3 text-xs md:text-sm font-bold tracking-tight md:tracking-wide transition-colors duration-300 whitespace-nowrap
        ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'}
      `}>
        {sound.label}
      </span>

      {/* Play/Pause Indicator (Overlay) */}
      <div className={`
        absolute top-2 right-2 p-1 rounded-full bg-white/80 text-gray-800
        transition-all duration-300 transform
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
      `}>
        {isActive ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
      </div>

      {/* Ripple Effect Element (Purely visual) */}
      {isActive && (
        <span className="absolute w-full h-full rounded-full bg-white opacity-20 animate-ping" />
      )}
    </button>
  );
};

export default SoundButton;