import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BreakTimerProps {
  visible: boolean;
  onComplete: () => void;
  onSkip: () => void;
  breakDuration: number; // in seconds
}

export default function BreakTimer({ 
  visible, 
  onComplete, 
  onSkip, 
  breakDuration 
}: BreakTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(breakDuration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Calculate progress (0 to 1)
  const progress = 1 - (timeRemaining / breakDuration);
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (visible && !isActive) {
      setIsActive(true);
      setTimeRemaining(breakDuration);
      setIsCompleted(false);
    }
    
    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } 
    
    if (timeRemaining === 0 && isActive) {
      setIsCompleted(true);
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, isActive, timeRemaining, breakDuration]);

  // Animation styles
  const circleCircumference = 2 * Math.PI * 45;
  const strokeDashoffset = circleCircumference - (progress * circleCircumference);
  
  // Breathing animation class
  const breathingClass = timeRemaining % 8 < 4 
    ? "animate-breatheIn" 
    : "animate-breatheOut";

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-white/90 dark:bg-gray-900/90 z-50 transition-all duration-500 flex flex-col items-center justify-center p-6",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{
        backdropFilter: "blur(8px)"
      }}
    >
      <div className={cn(
        "max-w-sm w-full rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6 transition-all duration-500",
        visible ? "translate-y-0 scale-100" : "translate-y-24 scale-95",
      )}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2 text-primary-700 dark:text-primary-400">
            Time for a short break
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Stretch, hydrate, or just breathe deeply
          </p>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Timer circle */}
            <svg 
              className="w-48 h-48 -rotate-90 transform" 
              viewBox="0 0 100 100"
            >
              <circle 
                className="text-gray-200 dark:text-gray-700" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-primary-500 dark:text-primary-400 transition-all duration-300" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Breathing animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={cn(
                  "w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 transition-all duration-3000 ease-in-out",
                  breathingClass
                )}
              ></div>
            </div>
            
            {/* Timer text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={onSkip}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors px-3 py-1 rounded-md"
          >
            Skip Break
          </button>
          
          <button 
            onClick={onComplete}
            disabled={!isCompleted}
            className={cn(
              "px-4 py-2 rounded-md font-medium transition-all duration-300",
              isCompleted
                ? "bg-primary-600 hover:bg-primary-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            )}
          >
            Resume Watching
          </button>
        </div>
      </div>
    </div>
  );
}