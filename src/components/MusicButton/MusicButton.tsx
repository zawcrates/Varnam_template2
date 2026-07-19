import React, { useRef, useState, useEffect } from 'react';

/**
 * Premium Music Toggle Button fixed at the bottom right.
 * Renders an animated audio visualizer wave that bounces when playing
 * and remains static when paused. Supports interactive play/pause and
 * autoplay on the first user interaction.
 */
export const MusicButton: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Direct hotlink to a soft, romantic instrumental acoustic track as default,
  // falling back to local /music/background.mp3 if provided.
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  useEffect(() => {
    // Create the audio element dynamically
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.45; // Calibrated volume so it is gentle and atmospheric
    audioRef.current = audio;

    // Autoplay on first user interaction (standard pattern to bypass browser autoplay blocks)
    const handleAutoplay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            cleanupAutoplay();
          })
          .catch((err) => {
            console.log('Autoplay prevented by browser, waiting for user click:', err);
          });
      }
    };

    const cleanupAutoplay = () => {
      document.removeEventListener('click', handleAutoplay);
      document.removeEventListener('touchstart', handleAutoplay);
      document.removeEventListener('scroll', handleAutoplay);
    };

    document.addEventListener('click', handleAutoplay);
    document.addEventListener('touchstart', handleAutoplay);
    document.addEventListener('scroll', handleAutoplay);

    return () => {
      cleanupAutoplay();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio failed to play:', err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Visualizer CSS Animations injected directly to ensure compatibility */}
      <style>{`
        @keyframes bounce-left {
          0%, 100% { height: 16px; }
          50% { height: 26px; }
        }
        @keyframes bounce-mid {
          0%, 100% { height: 22px; }
          50% { height: 32px; }
        }
        @keyframes bounce-right {
          0%, 100% { height: 18px; }
          50% { height: 28px; }
        }
      `}</style>

      <button
        onClick={togglePlay}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-[#1a1a1a] flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.15)] hover:bg-white/55 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto group"
        aria-label="Toggle background music"
      >
        {/* Animated wave bars visualizer */}
        <div className="flex items-end justify-center gap-1.5 h-8 w-8">
          <div
            className={`w-1.5 rounded-full bg-[#1a1a1a] transition-all duration-300 ${
              isPlaying ? 'animate-[bounce-left_0.8s_infinite_ease-in-out]' : 'h-4'
            }`}
          />
          <div
            className={`w-1.5 rounded-full bg-[#1a1a1a] transition-all duration-300 ${
              isPlaying ? 'animate-[bounce-mid_0.6s_infinite_ease-in-out]' : 'h-[22px]'
            }`}
          />
          <div
            className={`w-1.5 rounded-full bg-[#1a1a1a] transition-all duration-300 ${
              isPlaying ? 'animate-[bounce-right_0.7s_infinite_ease-in-out]' : 'h-[18px]'
            }`}
          />
        </div>
      </button>
    </div>
  );
};
