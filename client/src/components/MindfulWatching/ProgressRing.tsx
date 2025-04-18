import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  onClick?: () => void;
}

/**
 * ProgressRing component
 * 
 * Displays a circular progress indicator that:
 * - Shows the current progress as a filled arc
 * - Changes color based on the progress value
 * - Subtly indicates extended viewing periods
 * 
 * The hue-shift animation becomes more noticeable as the
 * watching session extends, serving as a gentle reminder
 * of extended screen time.
 */
export default function ProgressRing({ progress, onClick }: ProgressRingProps) {
  // SVG parameters
  const size = 70; // Size of the SVG
  const strokeWidth = 3; // Width of the progress ring
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = radius * 2 * Math.PI; // Total length of the circle
  const dash = (progress * circumference); // Length of the arc to fill
  
  // Color based on progress (gentle to more noticeable)
  const getColorClass = () => {
    if (progress < 0.4) return "stroke-primary-400";
    if (progress < 0.7) return "stroke-primary-500";
    return "stroke-primary-600 animate-hueShift"; // Add animation for extended watching
  };

  return (
    <div 
      className="absolute z-10 inset-0 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
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
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-500", 
            getColorClass()
          )}
        />
      </svg>
    </div>
  );
}