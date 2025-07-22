
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
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueLength = useRef(value.length);

  // Create mechanical typing sound - only trigger on actual typing (length increase)
  useEffect(() => {
    const currentLength = value.length;
    const previousLength = prevValueLength.current;
    
    // Only play sound when length increases (typing) and not on initial load or deletion
    if (currentLength > previousLength && currentLength > 0 && !disabled) {
      const createKeySound = async () => {
        try {
          if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
            console.log('Creating audio context for typing sound');
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            // Resume audio context if suspended (required for user interaction)
            if (audioContext.state === 'suspended') {
              await audioContext.resume();
              console.log('Audio context resumed');
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // More noticeable mechanical sound
            oscillator.frequency.value = 1200 + Math.random() * 400; // Higher frequency for mechanical sound
            oscillator.type = 'square';
            
            // Increased volume for better audibility
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            
            console.log('Typing sound played successfully');
            
            // Close audio context after use to prevent memory leaks
            setTimeout(() => {
              audioContext.close();
            }, 150);
          } else {
            console.log('AudioContext not available');
          }
        } catch (e) {
          console.error('Audio error:', e);
        }
      };
      
      createKeySound();
    }
    
    // Update the previous length
    prevValueLength.current = currentLength;
  }, [value.length, disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change triggered:', e.target.value);
    onChange(e.target.value);
  };

  const handleFocus = () => {
    console.log('Input focused');
    setIsFocused(true);
  };

  const handleBlur = () => {
    console.log('Input blurred');
    setIsFocused(false);
  };

  const handleContainerClick = () => {
    console.log('Container clicked, focusing input');
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  const maxLength = 50; // Maximum word length
  const charCount = value.length;

  // Generate dots for counter
  const generateDots = () => {
    const dots = [];
    const activeCount = Math.min(charCount, maxLength);
    
    for (let i = 0; i < maxLength; i++) {
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
            "w-full h-20 pl-16 pr-8 bg-transparent text-2xl font-medium",
            "placeholder:text-muted-foreground/60 text-center",
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
          {generateDots().slice(0, 25)}
        </div>
        {maxLength > 25 && (
          <>
            <div className="w-2" /> {/* Spacer */}
            <div className="flex space-x-1">
              {generateDots().slice(25)}
            </div>
          </>
        )}
      </div>
      
      {/* Character count text */}
      <div className="mt-2 text-center">
        <span className={cn(
          "text-sm font-mono transition-colors duration-300",
          charCount > maxLength * 0.8 
            ? "text-warning" 
            : charCount > 0 
              ? "text-primary" 
              : "text-muted-foreground/60"
        )}>
          {charCount}/{maxLength}
        </span>
      </div>
      
      {/* Typing indicator */}
      {isFocused && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">输入中...</span>
          </div>
        </div>
      )}
    </div>
  );
};
