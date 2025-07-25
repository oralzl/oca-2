
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  onSearch?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
}

export const EnhancedSearchInput: React.FC<EnhancedSearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  onSearch,
  placeholder = "输入英文单词...",
  disabled = false,
  className,
  compact = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const prevValueLength = useRef(value.length);

  // Initialize audio context on first user interaction
  const initializeAudio = async () => {
    if (!audioEnabled && typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        audioContextRef.current = audioContext;
        setAudioEnabled(true);
        console.log('Audio enabled through user interaction');
      } catch (e) {
        console.error('Failed to initialize audio:', e);
      }
    }
  };

  // Create mechanical typing sound - only trigger on actual typing (length increase)
  useEffect(() => {
    const currentLength = value.length;
    const previousLength = prevValueLength.current;
    
    // Only play sound when length increases (typing) and not on initial load or deletion
    if (currentLength > previousLength && currentLength > 0 && !disabled && audioEnabled && audioContextRef.current) {
      const createKeySound = () => {
        try {
          const audioContext = audioContextRef.current;
          if (audioContext && audioContext.state === 'running') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // More noticeable mechanical sound
            oscillator.frequency.value = 1200 + Math.random() * 400;
            oscillator.type = 'square';
            
            // Increased volume for better audibility
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.08);
            
            console.log('Typing sound played successfully');
          }
        } catch (e) {
          console.error('Audio error:', e);
        }
      };
      
      createKeySound();
    }
    
    // Update the previous length
    prevValueLength.current = currentLength;
  }, [value.length, disabled, audioEnabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change triggered:', e.target.value);
    onChange(e.target.value);
  };

  const handleFocus = async () => {
    console.log('Input focused');
    setIsFocused(true);
    await initializeAudio();
  };

  const handleBlur = () => {
    console.log('Input blurred');
    setIsFocused(false);
  };

  const handleContainerClick = async () => {
    console.log('Container clicked, focusing input');
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
      await initializeAudio();
    }
  };

  const maxLength = 50; // Maximum word length
  const charCount = value.length;
  const defaultDots = 6; // Default display dots
  const displayDots = Math.max(defaultDots, charCount); // Show more dots when exceeding default

  // Generate dots for counter
  const generateDots = () => {
    const dots = [];
    const activeCount = Math.min(charCount, displayDots);
    
    for (let i = 0; i < displayDots; i++) {
      dots.push(
        <div
          key={i}
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300",
            i < activeCount 
              ? "bg-primary shadow-glow scale-110" 
              : "bg-border/30"
          )}
        />
      );
    }
    return dots;
  };

  return (
    <div className={cn("relative group w-full", className)}>
      {/* Main Input Container */}
      <div 
        className={cn(
          "relative border-2 transition-all duration-500 bg-card/50 backdrop-blur-sm cursor-text",
          "rounded-2xl overflow-hidden w-full",
          isFocused 
            ? "border-primary shadow-[0_0_40px_-12px_hsl(var(--primary))]" 
            : "border-border/20 hover:border-border/40",
          disabled && "cursor-not-allowed"
        )}
        onClick={handleContainerClick}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {/* Animated background glow */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5",
          "opacity-0 transition-opacity duration-500 pointer-events-none",
          isFocused && "opacity-100"
        )} />
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            "w-full px-4 bg-transparent font-medium text-center",
            "placeholder:text-muted-foreground/60",
            "focus:outline-none transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            compact ? "h-7 text-base" : "h-20 text-2xl",
            isFocused && "text-foreground placeholder:text-muted-foreground/40"
          )}
          style={{
            textAlign: 'center',
            letterSpacing: '0.05em'
          }}
        />
        
        {/* Search Button */}
        {onSearch && (
          <>
            <button
              onClick={onSearch}
              disabled={disabled}
              className={cn(
                "absolute right-4 top-1/2 transform -translate-y-1/2",
                "flex items-center justify-center",
                "transition-all duration-150",
                compact ? "w-5 h-5" : "w-8 h-8",
                !disabled && "hover:scale-110 active:scale-95",
                disabled ? "cursor-not-allowed" : ""
              )}
            >
              {!disabled && (
                <Search 
                  className={cn(
                    "text-blue-500",
                    compact ? "w-4 h-4" : "w-6 h-6"
                  )}
                  strokeWidth={3}
                  style={{
                    filter: 'drop-shadow(1px 1px 0px rgba(59, 130, 246, 0.3))'
                  }}
                />
              )}
            </button>
            
            {/* Loading Animation - positioned outside the opacity-affected container */}
            {disabled && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 opacity-100">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 grid grid-cols-3 gap-[1px]">
                    {/* Create 9 pixel blocks in 3x3 grid */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-[6px] h-[6px] transition-all duration-300",
                          // Create breathing pattern with different delays
                          i === 4 ? "bg-blue-500 animate-[pulse_1s_ease-in-out_infinite]" : // center
                          [1, 3, 5, 7].includes(i) ? "bg-blue-400 animate-[pulse_1.2s_ease-in-out_infinite_0.1s]" : // cross
                          "bg-blue-300 animate-[pulse_1.4s_ease-in-out_infinite_0.2s]" // corners
                        )}
                        style={{
                          animationDelay: `${(i % 3) * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-blue-500/20 blur-sm animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Scanning line effect */}
        <div className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none",
          "transition-all duration-1000 ease-in-out",
          isFocused ? "w-full opacity-100" : "w-0 opacity-0"
        )} />
        
        {/* Character Counter with Dots - Inside Input */}
        {!compact && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-1 min-h-[12px]">
            <div className="flex space-x-1">
              {generateDots()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
