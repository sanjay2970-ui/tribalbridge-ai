/**
 * Speech Service: Web Speech Synthesis + Web Audio API + Fallback Chime Generator
 * Designed to provide audio feedback in classroom environments.
 */

export class SpeechService {
  private static instance: SpeechService;
  private audioCtx: AudioContext | null = null;

  private constructor() {}

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Plays a pleasant educational frequency chime using Web Audio API
   */
  public playEducationalChime(pitch: 'high' | 'medium' | 'success' = 'medium') {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqs = {
        high: [587.33, 880], // D5 -> A5
        medium: [440, 659.25], // A4 -> E5
        success: [523.25, 659.25, 783.99] // C5 -> E5 -> G5
      };

      const selected = freqs[pitch];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(selected[0], ctx.currentTime);
      if (selected[1]) {
        osc.frequency.setValueAtTime(selected[1], ctx.currentTime + 0.12);
      }
      if (selected[2]) {
        osc.frequency.setValueAtTime(selected[2], ctx.currentTime + 0.24);
      }

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio context might fail on restricted browser permissions; silently ignore
    }
  }

  /**
   * Pronounce Hindi speech using browser SpeechSynthesis
   */
  public speakHindi(text: string, rate: number = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        this.playEducationalChime('medium');
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = rate;

      // Select an Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.name.includes('Hindi') || v.name.includes('India'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => {
        this.playEducationalChime('medium');
        resolve();
      };

      this.playEducationalChime('medium');
      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Pronounce Tribal (Santhali/Ho/Mundari) phrase using phonetic approximation
   * supplemented with an educational audio cue
   */
  public speakTribal(text: string, phonetic?: string, rate: number = 0.85): Promise<void> {
    return new Promise((resolve) => {
      this.playEducationalChime('success');

      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      // Use phonetic string if available for clearer speech pronunciation
      const spokenText = phonetic || text;
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = rate;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India'));
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    });
  }

  /**
   * Stops any ongoing speech synthesis
   */
  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = SpeechService.getInstance();
