import { useMemo } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  onClick?: () => void;
}

export default function ProgressRing({ progress, onClick }: ProgressRingProps) {
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = useMemo(() => {
    return circumference - (progress * circumference);
  }, [progress, circumference]);
  
  // Color changes based on progress
  const strokeColor = useMemo(() => {
    if (progress > 0.75) return "stroke-error";
    if (progress > 0.5) return "stroke-warning";
    return "stroke-primary-600";
  }, [progress]);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <svg 
          className="w-16 h-16 -rotate-90" 
          viewBox="0 0 100 100"
        >
          <circle 
            className="text-gray-300 dark:text-gray-600" 
            stroke="currentColor" 
            strokeWidth="8" 
            fill="transparent" 
            r="42" 
            cx="50" 
            cy="50" 
          />
          <circle 
            className={cn(
              "transition-all duration-300 animate-[hueShift_10s_infinite]",
              strokeColor
            )}
            strokeWidth="8" 
            fill="transparent" 
            r="42" 
            cx="50" 
            cy="50" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.3s, stroke 0.3s",
            }}
          />
        </svg>
        <button 
          onClick={onClick}
          className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full h-12 w-12 shadow-lg"
        >
          <Play className="h-6 w-6 text-primary-700 dark:text-primary-400 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
