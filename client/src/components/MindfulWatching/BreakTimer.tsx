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
      "bg-black/30 backdrop-blur-md",
      "flex flex-col items-center justify-center",
      "transform transition-all duration-500 ease-in-out",
      "animate-in fade-in"
    )}>
      <div className="relative flex flex-col items-center">
        {/* Progress ring with breathing animation */}
        <div className="relative">
          {/* Pulsing background circle */}
          <div 
            className={cn(
              "absolute -inset-10 rounded-full bg-primary-100 dark:bg-primary-900/20",
              isBreathingIn ? "animate-breatheIn" : "animate-breatheOut"
            )}
          />
          
          {/* Progress ring */}
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              className="stroke-gray-300 dark:stroke-gray-600"
            />
            
            {/* Progress arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dash}
              strokeLinecap="round"
              className="stroke-primary-500 transition-all duration-1000"
            />
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-medium text-gray-800 dark:text-gray-200">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {isBreathingIn ? "Breathe in..." : "Breathe out..."}
            </p>
          </div>
        </div>
        
        {/* Instructions */}
        <p className="mt-8 text-center text-gray-700 dark:text-gray-300 max-w-xs">
          Take a moment to breathe and rest your eyes. Follow the breathing rhythm.
        </p>
        
        {/* Control buttons */}
        <div className="mt-6 flex space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Skip Break
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onComplete}
            disabled={!isTimerComplete}
            className={cn(
              "bg-primary-500 text-white transition-all duration-300",
              isTimerComplete 
                ? "hover:bg-primary-600 opacity-100" 
                : "opacity-50 cursor-not-allowed"
            )}
          >
            Resume Watching
          </Button>
        </div>
      </div>
    </div>
  );
}