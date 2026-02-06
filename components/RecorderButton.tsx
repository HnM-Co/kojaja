import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw } from 'lucide-react';
import { audioEngine } from '../services/audioEngine'; // Import engine to stop noises while recording

interface RecorderButtonProps {
  isActive: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const RecorderButton: React.FC<RecorderButtonProps> = ({ isActive, onPlay, onStop }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
       if (audioRef.current) {
         audioRef.current.pause();
         audioRef.current = null;
       }
    };
  }, []);

  // Sync state with parent
  useEffect(() => {
    if (!isActive && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (isActive && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => {
            console.error("Play failed", e);
            onStop();
        });
    }
  }, [isActive, onStop]);

  const startRecording = async () => {
    try {
      // Important: Stop all other sounds to prevent feedback loop during recording
      audioEngine.stopAll();
      // Also stop self if playing (though logic usually prevents this state)
      if (audioRef.current) {
          audioRef.current.pause();
          onStop();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' }); // Use webm for browser compatibility
        setAudioBlob(blob);
        
        const url = URL.createObjectURL(blob);
        audioRef.current = new Audio(url);
        audioRef.current.loop = true; // Loop the mom's voice like other noises
        
        // Clean up stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      // We don't call onStop() here because we want to maintain the "recording" UI state locally, 
      // but we did stop other engine sounds above.
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("마이크 권한이 필요합니다. 브라우저 설정에서 마이크 접근을 허용해주세요.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('녹음된 목소리를 삭제하시겠습니까?')) {
      setAudioBlob(null);
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
      }
      if (isActive) onStop();
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (audioBlob) {
      if (isActive) {
        onStop(); 
      } else {
        onPlay();
      }
    } else {
      startRecording();
    }
  };

  // Styles
  const buttonBaseClass = `
    group relative flex flex-col items-center justify-center 
    p-4 h-36 w-full rounded-3xl transition-all duration-500 ease-out
    shadow-lg overflow-hidden
  `;

  // Dynamic visual states
  let visualClass = '';
  let icon = null;
  let label = '';
  let gradient = '';

  if (isRecording) {
    visualClass = 'border border-red-400 bg-red-50 ring-4 ring-red-100';
    icon = <Square className="w-8 h-8 fill-current animate-pulse" />;
    label = '녹음 중...';
    gradient = 'from-red-100 to-red-200';
  } else if (audioBlob) {
    // Recorded State
    visualClass = isActive 
        ? 'border border-rose-300 bg-rose-50 scale-105 shadow-rose-300/50 shadow-2xl ring-2 ring-rose-300' 
        : 'border border-rose-200 bg-rose-50/50 hover:bg-rose-100/80 hover:scale-102 hover:shadow-xl';
    icon = isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />;
    label = '엄마 목소리';
    gradient = 'from-rose-200 to-pink-200';
  } else {
    // Empty State (Special styling to stand out)
    visualClass = 'border-2 border-dashed border-rose-300/60 bg-rose-50/30 hover:bg-rose-50/60 hover:border-rose-400';
    icon = <Mic className="w-8 h-8 text-rose-400" />;
    label = '엄마 목소리 녹음';
    gradient = 'from-rose-100/50 to-orange-100/50';
  }

  return (
    <button
      onClick={handleClick}
      className={`${buttonBaseClass} ${visualClass}`}
    >
       {/* Internal Gradient */}
       <div 
        className={`absolute inset-0 opacity-40 transition-opacity duration-700 bg-gradient-to-br ${gradient}
          ${isActive || isRecording ? 'opacity-60' : 'group-hover:opacity-50'}
        `} 
      />

      {/* Delete Button (Only when recorded) */}
      {audioBlob && !isRecording && (
        <div 
          onClick={handleDelete}
          className="absolute top-2 left-2 p-2 rounded-full text-rose-400 hover:text-red-600 hover:bg-white/60 transition-all z-20"
          title="삭제 및 재녹음"
        >
          <RotateCcw size={14} />
        </div>
      )}

      {/* Icon Container */}
      <div className={`
        relative z-10 p-3 rounded-2xl transition-all duration-500
        ${(isActive || isRecording)
          ? 'bg-white text-rose-500 shadow-md scale-110' 
          : 'bg-white/60 text-rose-400 group-hover:bg-white/80'
        }
        ${isRecording ? 'text-red-500' : ''}
      `}>
        {icon}
      </div>

      {/* Label */}
      <span className={`
        relative z-10 mt-3 text-sm font-bold tracking-wide transition-colors duration-300
        ${isActive || isRecording ? 'text-rose-900' : 'text-rose-800/80'}
      `}>
        {label}
      </span>

      {/* Play/Pause overlay for visual consistency */}
      {audioBlob && !isRecording && (
        <div className={`
            absolute top-2 right-2 p-1 rounded-full bg-white/80 text-rose-800
            transition-all duration-300 transform
            ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
        `}>
             {isActive ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
        </div>
      )}
      
       {/* Ripple/Pulse for Recording */}
       {isRecording && (
        <span className="absolute w-full h-full rounded-full bg-red-400 opacity-20 animate-ping" />
      )}
    </button>
  );
};

export default RecorderButton;