import React from 'react';
import { SoundItem, SoundCategory, SynthType } from './types';
import { 
  Heart, Wind, Waves, Coffee, Car, Trees, Droplets, Flame, 
  Leaf, Bug, Bird, Fan, UtensilsCrossed, CloudFog, Keyboard, 
  PenTool, Mountain, Gem, Zap, ShoppingBag, User, Mic
} from 'lucide-react';

export const SOUNDS: SoundItem[] = [
  // HUMAN (사람소리)
  {
    id: 'heartbeat',
    label: '심장박동',
    category: SoundCategory.HUMAN,
    icon: <Heart className="w-8 h-8" />,
    gradient: 'from-red-400 to-red-600',
    synthType: SynthType.BROWN,
    src: '/sounds/heartbeat.mp3'
  },
  {
    id: 'shush',
    label: '쉬소리',
    category: SoundCategory.HUMAN,
    icon: <User className="w-8 h-8" />,
    gradient: 'from-pink-300 to-rose-400',
    synthType: SynthType.WHITE,
    src: '/sounds/shush.mp3'
  },
  {
    id: 'ah-sound',
    label: '아~ 소리',
    category: SoundCategory.HUMAN,
    icon: <Mic className="w-8 h-8" />,
    gradient: 'from-amber-200 to-orange-400',
    synthType: SynthType.BROWN,
    src: '/sounds/ah.mp3'
  },

  // NATURE (자연의 소리)
  {
    id: 'waves',
    label: '파도소리',
    category: SoundCategory.NATURE,
    icon: <Waves className="w-8 h-8" />,
    gradient: 'from-teal-400 to-blue-600',
    synthType: SynthType.PINK,
    src: '/sounds/waves.mp3'
  },
  {
    id: 'forest',
    label: '숲소리',
    category: SoundCategory.NATURE,
    icon: <Trees className="w-8 h-8" />,
    gradient: 'from-green-400 to-emerald-700',
    synthType: SynthType.PINK,
    src: '/sounds/forest.mp3'
  },
  {
    id: 'stream',
    label: '물흐르는 소리',
    category: SoundCategory.NATURE,
    icon: <Droplets className="w-8 h-8" />,
    gradient: 'from-cyan-300 to-blue-500',
    synthType: SynthType.PINK,
    src: '/sounds/stream.mp3'
  },
  {
    id: 'fire',
    label: '장작 타는 소리',
    category: SoundCategory.NATURE,
    icon: <Flame className="w-8 h-8" />,
    gradient: 'from-orange-600 to-red-700',
    synthType: SynthType.BROWN,
    src: '/sounds/fire.mp3'
  },
  {
    id: 'leaves',
    label: '낙엽 밟는 소리',
    category: SoundCategory.NATURE,
    icon: <Leaf className="w-8 h-8" />,
    gradient: 'from-amber-600 to-yellow-700',
    synthType: SynthType.PINK,
    src: '/sounds/leaves.mp3'
  },
  {
    id: 'crickets',
    label: '가을밤 귀뚜라미',
    category: SoundCategory.NATURE,
    icon: <Bug className="w-8 h-8" />,
    gradient: 'from-indigo-800 to-purple-900',
    synthType: SynthType.NONE,
    src: '/sounds/crickets.mp3'
  },
  {
    id: 'cave',
    label: '동굴 물방울',
    category: SoundCategory.NATURE,
    icon: <Gem className="w-8 h-8" />,
    gradient: 'from-slate-700 to-gray-800',
    synthType: SynthType.BROWN,
    src: '/sounds/cave.mp3'
  },
  {
    id: 'birds',
    label: '아침 새소리',
    category: SoundCategory.NATURE,
    icon: <Bird className="w-8 h-8" />,
    gradient: 'from-lime-400 to-green-600',
    synthType: SynthType.NONE,
    src: '/sounds/birds.mp3'
  },
  {
    id: 'reeds',
    label: '갈대밭',
    category: SoundCategory.NATURE,
    icon: <Wind className="w-8 h-8 rotate-90" />,
    gradient: 'from-amber-200 to-orange-300',
    synthType: SynthType.PINK,
    src: '/sounds/reeds.mp3'
  },

  // DAILY (일상 소리)
  {
    id: 'vacuum',
    label: '청소기',
    category: SoundCategory.DAILY,
    icon: <Zap className="w-8 h-8" />,
    gradient: 'from-gray-600 to-gray-800',
    synthType: SynthType.BROWN,
    src: '/sounds/vacuum.mp3'
  },
  {
    id: 'vinyl',
    label: '비닐 소리',
    category: SoundCategory.DAILY,
    icon: <ShoppingBag className="w-8 h-8" />,
    gradient: 'from-slate-300 to-gray-400',
    synthType: SynthType.WHITE,
    src: '/sounds/plastic.mp3'
  },
  {
    id: 'cafe',
    label: '카페 소리',
    category: SoundCategory.DAILY,
    icon: <Coffee className="w-8 h-8" />,
    gradient: 'from-amber-700 to-brown-900',
    synthType: SynthType.NONE,
    src: '/sounds/cafe.mp3'
  },
  {
    id: 'road',
    label: '도로 소리',
    category: SoundCategory.DAILY,
    icon: <Car className="w-8 h-8" />,
    gradient: 'from-gray-500 to-slate-700',
    synthType: SynthType.BROWN,
    src: '/sounds/road.mp3'
  },
  {
    id: 'fan',
    label: '선풍기',
    category: SoundCategory.DAILY,
    icon: <Fan className="w-8 h-8" />,
    gradient: 'from-cyan-500 to-blue-600',
    synthType: SynthType.WHITE,
    src: '/sounds/fan.mp3'
  },
  {
    id: 'dishwasher',
    label: '식기세척기',
    category: SoundCategory.DAILY,
    icon: <UtensilsCrossed className="w-8 h-8" />, 
    gradient: 'from-blue-200 to-blue-400',
    synthType: SynthType.BROWN,
    src: '/sounds/dishwasher.mp3'
  },
  {
    id: 'kettle',
    label: '주전자',
    category: SoundCategory.DAILY,
    icon: <CloudFog className="w-8 h-8" />, 
    gradient: 'from-orange-300 to-red-400',
    synthType: SynthType.WHITE,
    src: '/sounds/kettle.mp3'
  },
  {
    id: 'keyboard',
    label: '키보드',
    category: SoundCategory.DAILY,
    icon: <Keyboard className="w-8 h-8" />,
    gradient: 'from-slate-200 to-slate-400',
    synthType: SynthType.NONE,
    src: '/sounds/keyboard.mp3'
  },
  {
    id: 'pencil',
    label: '연필 글씨',
    category: SoundCategory.DAILY,
    icon: <PenTool className="w-8 h-8" />,
    gradient: 'from-yellow-600 to-yellow-800',
    synthType: SynthType.WHITE,
    src: '/sounds/pencil.mp3'
  },
];