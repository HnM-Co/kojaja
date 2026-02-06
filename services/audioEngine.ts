import { SynthType } from '../types';

/**
 * A simple synthesizer class to generate White, Pink, and Brown noise.
 * Updated to support multiple simultaneous sounds (Polyphony).
 */
class AudioEngine {
  private audioContext: AudioContext | null = null;
  // Map of soundId -> AudioBufferSourceNode
  private sources: Map<string, AudioBufferSourceNode> = new Map();
  // Map of soundId -> GainNode (individual volume control if needed, but here used for envelope)
  private gainNodes: Map<string, GainNode> = new Map();
  
  private masterGain: GainNode | null = null;
  private volumeValue: number = 0.5;

  constructor() {
    // Lazy initialization
  }

  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volumeValue;
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  // Create a noise buffer
  private createNoiseBuffer(type: SynthType): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    // 5 seconds of noise, looped
    const bufferSize = this.audioContext.sampleRate * 5; 
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      switch (type) {
        case SynthType.WHITE:
          data[i] = white;
          break;
          
        case SynthType.PINK:
          // Simplified pink noise
          data[i] = (Math.random() * 2 - 1) * 0.5; 
          break;
          
        case SynthType.BROWN:
          // Brownian noise (1/f^2)
          const lastOut = (i > 0) ? data[i - 1] : 0;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          data[i] *= 3.5; 
          break;
          
        default:
          data[i] = 0;
      }
    }
    
    // Better Pink Noise Algo
    if (type === SynthType.PINK) {
       let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
       for (let i = 0; i < bufferSize; i++) {
         const white = Math.random() * 2 - 1;
         b0 = 0.99886 * b0 + white * 0.0555179;
         b1 = 0.99332 * b1 + white * 0.0750759;
         b2 = 0.96900 * b2 + white * 0.1538520;
         b3 = 0.86650 * b3 + white * 0.3104856;
         b4 = 0.55000 * b4 + white * 0.5329522;
         b5 = -0.7616 * b5 - white * 0.0168980;
         data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
         data[i] *= 0.11; 
         b6 = white * 0.115926;
       }
    }

    return buffer;
  }

  public async play(id: string, type: SynthType) {
    this.initContext();
    
    // Resume context if suspended
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }

    // If already playing this ID, stop it first to restart (or do nothing)
    // Here we return to avoid restarting/glitching
    if (this.sources.has(id)) return;

    if (type === SynthType.NONE) {
       // Fallback for demo
       type = SynthType.PINK; 
    }

    if (!this.audioContext || !this.masterGain) return;

    const buffer = this.createNoiseBuffer(type);
    if (buffer) {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.loop = true;
      
      // Chain: Source -> Individual Gain -> Biquad (optional) -> Master Gain -> Destination
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1.0, this.audioContext.currentTime + 1);

      if (type === SynthType.BROWN) {
         const biquadFilter = this.audioContext.createBiquadFilter();
         biquadFilter.type = "lowpass";
         biquadFilter.frequency.setValueAtTime(400, this.audioContext.currentTime);
         source.connect(biquadFilter);
         biquadFilter.connect(gainNode);
      } else {
         source.connect(gainNode);
      }

      gainNode.connect(this.masterGain);
      
      source.start();
      
      this.sources.set(id, source);
      this.gainNodes.set(id, gainNode);
    }
  }

  public stop(id: string) {
    const source = this.sources.get(id);
    const gainNode = this.gainNodes.get(id);

    if (source && gainNode && this.audioContext) {
      // Fade out individual sound
      gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);

      setTimeout(() => {
        try { source.stop(); } catch(e) {}
        source.disconnect();
        gainNode.disconnect();
      }, 500);

      this.sources.delete(id);
      this.gainNodes.delete(id);
    }
  }

  public stopAll() {
    this.sources.forEach((_, id) => this.stop(id));
  }

  public setVolume(val: number) {
    this.volumeValue = val;
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setTargetAtTime(val, this.audioContext.currentTime, 0.1);
    }
  }
}

export const audioEngine = new AudioEngine();