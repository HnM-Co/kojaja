import React from 'react';
import { SoundItem, SoundCategory, SynthType } from './types';
import { 
  Zap, CloudRain, ShoppingBag, Heart, MicOff, Waves, Coffee, Car, 
  Trees, Droplets, Flame, CloudLightning, Bug, Mountain, Bird, 
  Wind, Fan, Disc, Keyboard, PenTool, Smile, Music
} from 'lucide-react';

// We use direct SVG components (Lucide) for better control and performance
// Note: In a real app with file assets, we would include a 'src' property. 
// Here we define the 'synthType' to demonstrate the Web Audio API noise generation.

export const SOUNDS: SoundItem[] = [
  // HUMAN (사람소리) - Moved to top as requested
  {
    id: 'heartbeat',
    label: '심장박동',
    category: SoundCategory.HUMAN,
    icon: <Heart className="w-8 h-8" />,
    gradient: 'from-red-400 to-red-600',
    synthType: SynthType.BROWN 
  },
  {
    id: 'shush',
    label: '쉬소리',
    category: SoundCategory.HUMAN,
    icon: <MicOff className="w-8 h-8" />,
    gradient: 'from-pink-300 to-rose-400',
    synthType: SynthType.WHITE // White noise approximates 'Shhh' best
  },
  {
    id: 'ah-sound',
    label: '아 소리',
    category: SoundCategory.HUMAN,
    icon: <Smile className="w-8 h-8" />, // Open mouth representation
    gradient: 'from-slate-400 to-slate-600', // Darker gradient for male/low tone
    synthType: SynthType.BROWN // Brown noise is deeper/lower frequency
  },
  // Removed 'hum-sound'

  // NATURE (자연의 소리)
  {
    id: 'rain',
    label: '빗소리',
    category: SoundCategory.NATURE,
    icon: <CloudRain className="w-8 h-8" />,
    gradient: 'from-blue-700 to-indigo-900',
    synthType: SynthType.PINK
  },
  {
    id: 'waves',
    label: '파도소리',
    category: SoundCategory.NATURE,
    icon: <Waves className="w-8 h-8" />,
    gradient: 'from-teal-400 to-blue-600',
    synthType: SynthType.PINK
  },
  {
    id: 'stream',
    label: '물 흐르는 소리',
    category: SoundCategory.NATURE,
    icon: <Droplets className="w-8 h-8" />,
    gradient: 'from-cyan-300 to-blue-500',
    synthType: SynthType.PINK
  },
  {
    id: 'cave',
    label: '동굴 물방울',
    category: SoundCategory.NATURE,
    icon: <Mountain className="w-8 h-8" />,
    gradient: 'from-gray-800 to-black',
    synthType: SynthType.BROWN
  },
  {
    id: 'forest',
    label: '숲소리',
    category: SoundCategory.NATURE,
    icon: <Trees className="w-8 h-8" />,
    gradient: 'from-green-400 to-emerald-700',
    synthType: SynthType.PINK
  },
  {
    id: 'birds',
    label: '아침 새소리',
    category: SoundCategory.NATURE,
    icon: <Bird className="w-8 h-8" />,
    gradient: 'from-lime-300 to-green-500',
    synthType: SynthType.NONE 
  },
  {
    id: 'crickets',
    label: '귀뚜라미',
    category: SoundCategory.NATURE,
    icon: <Bug className="w-8 h-8" />,
    gradient: 'from-indigo-900 to-purple-900',
    synthType: SynthType.NONE
  },
  {
    id: 'reeds',
    label: '갈대밭',
    category: SoundCategory.NATURE,
    icon: <Wind className="w-8 h-8" />,
    gradient: 'from-amber-200 to-orange-300',
    synthType: SynthType.PINK
  },
  {
    id: 'fire',
    label: '장작 타는 소리',
    category: SoundCategory.NATURE,
    icon: <Flame className="w-8 h-8" />,
    gradient: 'from-orange-600 to-red-700',
    synthType: SynthType.BROWN 
  },
  // Removed 'leaves' (낙엽 밟는 소리)

  // DAILY (일상소리)
  {
    id: 'vacuum',
    label: '청소기',
    category: SoundCategory.DAILY,
    icon: <Zap className="w-8 h-8" />,
    gradient: 'from-gray-700 to-gray-900',
    synthType: SynthType.BROWN
  },
  {
    id: 'fan',
    label: '선풍기',
    category: SoundCategory.DAILY,
    icon: <Fan className="w-8 h-8" />,
    gradient: 'from-cyan-500 to-blue-600',
    synthType: SynthType.WHITE
  },
  {
    id: 'dryer',
    label: '식기세척기',
    category: SoundCategory.DAILY,
    icon: <Disc className="w-8 h-8" />, 
    gradient: 'from-blue-200 to-blue-400',
    synthType: SynthType.BROWN
  },
  {
    id: 'kettle',
    label: '주전자 끓는 소리',
    category: SoundCategory.DAILY,
    icon: <CloudLightning className="w-8 h-8" />, 
    gradient: 'from-orange-300 to-red-400',
    synthType: SynthType.WHITE
  },
  {
    id: 'plastic',
    label: '비닐 소리',
    category: SoundCategory.DAILY,
    icon: <ShoppingBag className="w-8 h-8" />,
    gradient: 'from-yellow-100 to-yellow-300',
    synthType: SynthType.WHITE 
  },
  {
    id: 'cafe',
    label: '카페 소리',
    category: SoundCategory.DAILY,
    icon: <Coffee className="w-8 h-8" />,
    gradient: 'from-amber-700 to-brown-900',
    synthType: SynthType.NONE
  },
  {
    id: 'road',
    label: '도로 소리',
    category: SoundCategory.DAILY,
    icon: <Car className="w-8 h-8" />,
    gradient: 'from-gray-500 to-slate-700',
    synthType: SynthType.BROWN
  },
  {
    id: 'keyboard',
    label: '키보드 타이핑',
    category: SoundCategory.DAILY,
    icon: <Keyboard className="w-8 h-8" />,
    gradient: 'from-slate-200 to-slate-400',
    synthType: SynthType.NONE
  },
  {
    id: 'pencil',
    label: '연필 글씨',
    category: SoundCategory.DAILY,
    icon: <PenTool className="w-8 h-8" />,
    gradient: 'from-yellow-600 to-yellow-800',
    synthType: SynthType.WHITE
  },
];