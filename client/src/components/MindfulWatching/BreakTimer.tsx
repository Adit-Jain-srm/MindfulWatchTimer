import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreakTimerProps {
  visible: boolean;
  onComplete: () => void;
  onSkip: () => void;
  breakDuration: number; // in seconds
}

/**
 * BreakTimer component
 * 
 * Displays a full-screen break timer with:
 * - Circular countdown visualization
 * - "Breathing" animation to encourage mindfulness
 * - Skip option for immediate return
 * - Resume button that activates after timer completion
 * 
 * This component represents the active break state in the user journey,
 * providing a calming, guided break experience.
 * 
 * FIGMA EXPORT NOTES:
 * - Create as a full-screen modal overlay (backdrop-blur-md)
 * - The breathing animation requires two variants (inhale/exhale) with Smart Animate
 * - Progress ring should be created as a circular arc with varying stroke-dashoffset
 * - For Resume Watching button, create two states: disabled and enabled
 * - This component has two major states: active break and completed break
 */
export default function BreakTimer({ 
  visible, 
  onComplete, 
  onSkip,
  breakDuration 
}: BreakTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(breakDuration);
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const isTimerComplete = timeRemaining <= 0;
  
  // Calculate progress (0 to 1)
  const progress = 1 - (timeRemaining / breakDuration);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.floor(Math.max(0, seconds) % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle breathing animation toggle
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setIsBreathingIn(prev => !prev);
    }, 4000); // 4 seconds per breath cycle
    
    return () => clearInterval(breathingInterval);
  }, []);
  
  // Handle countdown timer
  useEffect(() => {
    if (!visible || isTimerComplete) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [visible, isTimerComplete]);
  
  // Trigger completion callback when timer finishes
  useEffect(() => {
    if (isTimerComplete) {
      // Optional: play a subtle sound notification here
    }
  }, [isTimerComplete]);
  
  if (!visible) return null;
  
  // Calculate stroke-dashoffset for progress ring
  const size = 200;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = ((1 - progress) * circumference);
  
  return (
    <div className={cn(
      "fixed inset-0 z-50",
      "bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-md",
      "flex flex-col items-center justify-center",
      "transform transition-all duration-500 ease-in-out",
      "animate-in fade-in"
    )}>
      {/* Close/Skip button */}
      <button 
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow transition-all" 
        onClick={onSkip}
        aria-label="Skip break"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Status badge */}
        <div className="mb-4">
          <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs px-3 py-1 rounded-full font-medium mb-2">
            {isTimerComplete ? "Break Complete" : "Mindful Break"}
          </span>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {isTimerComplete ? "Great job!" : "Taking a Break"}
        </h2>
        
        {/* Sub title */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
          {isTimerComplete 
            ? "Your eyes and mind have had a chance to rest. Feel free to resume watching whenever you're ready." 
            : "Take a moment to rest your eyes and mind. Follow the breathing circle below for a guided experience."
          }
        </p>
        
        {/* Progress ring with breathing animation */}
        <div className="relative mb-10">
          {/* Pulsing background circle */}
          <div 
            className={cn(
              "absolute -inset-14 rounded-full bg-primary-100/50 dark:bg-primary-900/10 blur-md",
              isBreathingIn ? "animate-breatheIn" : "animate-breatheOut",
              "transition-all duration-4000"
            )}
          />
          
          <div className="relative shadow-lg rounded-full p-1">
            {/* Progress ring */}
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Outer decorative ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius + 8}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-200 dark:text-primary-800"
                strokeDasharray="3,3"
              />
              
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                strokeWidth={strokeWidth}
                className="stroke-gray-200 dark:stroke-gray-700"
              />
              
              {/* Progress arc - with gradient */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                strokeWidth={strokeWidth + 0.5}
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                strokeLinecap="round"
                stroke="url(#breakTimerGradient)"
                className="transition-all duration-1000"
              />
              
              {/* Define gradient */}
              <defs>
                <linearGradient id="breakTimerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Timer display */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className={cn(
                "text-3xl font-medium",
                "text-primary-700 dark:text-primary-300",
                "transition-all",
                isBreathingIn ? "scale-105" : "scale-100"
              )}>
                {formatTime(timeRemaining)}
              </div>
              <p className={cn(
                "text-sm mt-2",
                "text-primary-600/80 dark:text-primary-400/80",
                "font-medium tracking-wide"
              )}>
                {isBreathingIn ? "Breathe in..." : "Breathe out..."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <p className="text-gray-600 dark:text-gray-400 max-w-xs mb-8 leading-relaxed">
          Match your breathing to the expanding and contracting circle above. 
          This rhythmic breathing helps reduce stress and increase mindfulness.
        </p>
        
        {/* Control buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onSkip}
            className="text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            Skip Break
          </Button>
          
          <Button
            variant="default"
            onClick={onComplete}
            disabled={!isTimerComplete}
            className={cn(
              "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
              "text-white transition-all shadow-md hover:shadow-lg min-w-[160px]",
              isTimerComplete 
                ? "opacity-100" 
                : "opacity-50 cursor-not-allowed"
            )}
          >
            {isTimerComplete ? "Resume Watching" : "Finishing Break..."}
          </Button>
        </div>
        
        {/* Additional guidance */}
        {!isTimerComplete && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
            The break will end automatically, or you can skip anytime
          </p>
        )}
      </div>
    </div>
  );
}