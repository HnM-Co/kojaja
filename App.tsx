import React, { useState } from 'react';
import LiquidBackground from './components/LiquidBackground';
import SoundButton from './components/SoundButton';
import RecorderButton from './components/RecorderButton';
import { SOUNDS } from './constants';
import { SoundItem, SoundCategory } from './types';
import { Volume2, VolumeX, Sparkles, Moon } from 'lucide-react';
import { audioEngine } from './services/audioEngine';

// Placeholder Ad Component
interface AdBannerProps {
  variant?: 'default' | 'thin';
}

const AdBanner: React.FC<AdBannerProps> = ({ variant = 'default' }) => {
  const isThin = variant === 'thin';

  return (
    // Removed default margins (mt/mb) to let parent container control spacing
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-6 ${isThin ? 'mb-6' : ''}`}>
      <div className={`
        bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg 
        flex items-center justify-center text-center text-gray-500
        ${isThin ? 'p-1' : 'p-4 flex-col'}
      `}>
        {!isThin && (
          <span className="font-semibold text-gray-400 mb-1 text-xs uppercase tracking-widest">Sponsored</span>
        )}
        
        <div className={`
          w-full bg-white/30 rounded flex items-center justify-center border border-dashed border-gray-400/30 relative overflow-hidden
          ${isThin ? 'h-10' : 'h-16'}
        `}>
          {isThin && (
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 border border-gray-400/40 px-1 rounded bg-white/40">AD</span>
          )}
          <p className={isThin ? 'text-xs text-gray-500/80' : 'text-sm'}>
             {isThin ? '광고 영역' : '광고 배너 영역 (Google AdSense 등)'}
          </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Use a Set to track multiple active sound IDs
  const [activeSounds, setActiveSounds] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const RECORDING_ID = 'user-recording';

  const handleSoundClick = async (sound: SoundItem) => {
    const newActiveSounds = new Set(activeSounds);

    if (newActiveSounds.has(sound.id)) {
      // Toggle off
      newActiveSounds.delete(sound.id);
      audioEngine.stop(sound.id);
    } else {
      // Toggle on
      newActiveSounds.add(sound.id);
      await audioEngine.play(sound.id, sound.synthType);
    }
    
    setActiveSounds(newActiveSounds);
  };

  const handleRecorderPlay = () => {
    // When recorder plays, we just add it to the active set
    // It is handled internally by HTML Audio element, but we track it for UI
    const newActiveSounds = new Set(activeSounds);
    newActiveSounds.add(RECORDING_ID);
    setActiveSounds(newActiveSounds);
  };

  const handleRecorderStop = () => {
    const newActiveSounds = new Set(activeSounds);
    newActiveSounds.delete(RECORDING_ID);
    setActiveSounds(newActiveSounds);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioEngine.setVolume(isMuted ? 0 : newVol);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioEngine.setVolume(newMuted ? 0 : volume);
  };

  const sections = [
    { id: SoundCategory.HUMAN, label: '사람 소리', desc: '엄마 품처럼 따뜻한 소리' },
    { id: SoundCategory.NATURE, label: '자연의 소리', desc: '마음을 편안하게 해주는 자연의 소리' },
    { id: SoundCategory.DAILY, label: '일상 소리', desc: '익숙함이 주는 안정감' },
  ];

  return (
    <div className="relative min-h-screen font-sans text-gray-800 selection:bg-purple-200">
      <LiquidBackground />

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-2 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
                코자자
              </span>
              <div className="flex items-center">
                 <Moon className="w-6 h-6 text-yellow-400 fill-yellow-400 rotate-[-15deg]" />
              </div>
            </h1>
            <p className="text-sm text-gray-500 font-medium">육아 퇴근을 부탁해 🙏</p>
          </div>
        </div>
      </header>

      {/* Main Content with Sections */}
      <main className="relative z-10 px-4 md:px-6 pb-24 max-w-7xl mx-auto space-y-12">
        {/* Top Ad Banner - Thin Variant */}
        <AdBanner variant="thin" />

        {sections.map((section) => {
          const sectionSounds = SOUNDS.filter(s => s.category === section.id);
          if (sectionSounds.length === 0 && section.id !== SoundCategory.HUMAN) return null;

          return (
            <section key={section.id} className="animate-fade-in-up">
              <div className="mb-6 px-2">
                <div className="flex items-end gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    {section.label}
                  </h2>
                  <span className="text-sm text-gray-500 font-medium mb-1 opacity-80">
                    {section.desc}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-purple-200 via-pink-200 to-transparent opacity-60 rounded-full" />
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {section.id === SoundCategory.HUMAN && (
                  <div className="col-span-3">
                    <RecorderButton 
                      isActive={activeSounds.has(RECORDING_ID)}
                      onPlay={handleRecorderPlay}
                      onStop={handleRecorderStop}
                    />
                  </div>
                )}

                {sectionSounds.map((sound) => (
                  <SoundButton 
                    key={sound.id} 
                    sound={sound} 
                    isActive={activeSounds.has(sound.id)} 
                    onClick={handleSoundClick} 
                  />
                ))}
              </div>
            </section>
          );
        })}
        
        {/* Bottom Area: Grouped to remove excess whitespace */}
        <div className="flex flex-col gap-2">
          <AdBanner />
          <div className="flex justify-center opacity-40">
             <span className="text-[10px] font-semibold text-gray-500 tracking-widest font-mono">
               @acedoctor2026
             </span>
          </div>
        </div>

      </main>

      {/* Floating Player Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <div className="
            bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl 
            p-4 flex items-center justify-between gap-4 transition-transform duration-500
            hover:scale-[1.02]
          ">
            {/* Play Status */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`
                w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300
                ${activeSounds.size > 0 ? 'bg-purple-100 text-purple-600 animate-pulse-slow' : 'bg-gray-100 text-gray-400'}
              `}>
                 <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Now Playing</span>
                <span className="text-sm font-bold text-gray-800 truncate">
                  {activeSounds.size === 0 
                    ? '선택된 소리 없음'
                    : Array.from(activeSounds).map(id => {
                        if (id === RECORDING_ID) return '엄마 목소리';
                        return SOUNDS.find(s => s.id === id)?.label;
                      }).join(', ')
                  }
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 bg-white/40 px-3 py-2 rounded-lg border border-white/30 flex-shrink-0">
              <button 
                onClick={toggleMute}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="
                  w-20 md:w-32 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer
                  accent-purple-600 hover:accent-purple-500
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;