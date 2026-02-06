import React from 'react';

export enum SoundCategory {
  NATURE = 'NATURE', // 자연의 소리
  DAILY = 'DAILY',   // 일상 소리
  HUMAN = 'HUMAN',   // 사람 소리
}

// Noise types for our synthesizer to emulate
export enum SynthType {
  BROWN = 'brown', // Deep rumble (Vacuum, Thunder)
  PINK = 'pink',   // Balanced (Rain, Leaves)
  WHITE = 'white', // Harsh (Static, Fan)
  NONE = 'none',   // Complex sounds that can't be easily synthesized in a basic context need a real file
}

export interface SoundItem {
  id: string;
  label: string;
  category: SoundCategory;
  icon: React.ReactNode;
  gradient: string;
  synthType: SynthType; // Fallback generation type
}

export interface AudioState {
  isPlaying: boolean;
  currentSoundId: string | null;
  volume: number;
}