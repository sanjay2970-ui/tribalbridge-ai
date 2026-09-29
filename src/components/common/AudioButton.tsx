import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface AudioButtonProps {
  text: string;
  phonetic?: string;
  isHindi?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  phonetic,
  isHindi = false,
  size = 'md',
  label,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      if (isHindi) {
        await speechService.speakHindi(text);
      } else {
        await speechService.speakTribal(text, phonetic);
      }
    } catch {
      // Speech service fallbacks handle audio errors internally
    } finally {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={isPlaying ? 'Stop audio' : 'Listen to pronunciation'}
      aria-label={label || 'Listen to audio pronunciation'}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isPlaying
          ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400 animate-pulse'
          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Volume2 size={iconSizes[size]} className="animate-bounce text-amber-700" />
      ) : (
        <Volume2 size={iconSizes[size]} className="text-emerald-700" />
      )}
      {label && <span>{isPlaying ? 'Playing...' : label}</span>}
    </button>
  );
};
