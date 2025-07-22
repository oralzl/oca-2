
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const EnhancedSearchInput: React.FC<EnhancedSearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder = "输入英文单词...",
  disabled = false,
  className
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
    <div className={cn("relative group", className)}>
      {/* Main Input Container */}
      <div 
        className={cn(
          "relative border-2 transition-all duration-500 bg-card/50 backdrop-blur-sm cursor-text",
          "rounded-2xl overflow-hidden",
          isFocused 
            ? "border-primary shadow-[0_0_40px_-12px_hsl(var(--primary))] scale-[1.02]" 
            : "border-border/20 hover:border-border/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleContainerClick}
      >
        {/* Animated background glow */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5",
          "opacity-0 transition-opacity duration-500 pointer-events-none",
          isFocused && "opacity-100"
        )} />
        
        {/* Search Icon */}
        <Search className={cn(
          "absolute left-6 top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none",
          "w-6 h-6",
          isFocused ? "text-primary scale-110" : "text-muted-foreground"
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
            "w-full h-20 pl-16 pr-16 bg-transparent text-2xl font-medium text-center",
            "placeholder:text-muted-foreground/60",
            "focus:outline-none transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isFocused && "text-foreground placeholder:text-muted-foreground/40"
          )}
          style={{
            textAlign: 'center',
            letterSpacing: '0.05em'
          }}
        />
        
        {/* Scanning line effect */}
        <div className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none",
          "transition-all duration-1000 ease-in-out",
          isFocused ? "w-full opacity-100" : "w-0 opacity-0"
        )} />
      </div>
      
      {/* Character Counter with Dots */}
      <div className="mt-4 flex justify-center items-center space-x-1 min-h-[12px]">
        <div className="flex space-x-1">
          {generateDots()}
        </div>
      </div>
    </div>
  );
};
