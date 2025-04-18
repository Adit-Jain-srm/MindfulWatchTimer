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
 * 
 * FIGMA EXPORT NOTES:
 * - Create as a circular progress indicator with at least 3 variants:
 *   1. Early watching (< 40% progress): light teal color
 *   2. Mid watching (40-70% progress): medium teal color
 *   3. Extended watching (> 70% progress): darker teal with hue-shift animation
 * - Create the animation using multiple keyframes with filter: hue-rotate()
 * - The progress arc should be drawn using SVG stroke-dasharray and stroke-dashoffset
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
  
  // Filter effect for glowing appearance
  const getFilterEffect = () => {
    if (progress < 0.4) return "";
    if (progress < 0.7) return "filter drop-shadow(0 0 1px rgba(59, 130, 246, 0.3))";
    return "filter drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))";
  };

  return (
    <div 
      className="absolute z-10 inset-0 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg 
        width={size} 
        height={size} 
        className={cn(
          "transform -rotate-90 transition-all duration-500", 
          getFilterEffect()
        )}
      >
        {/* Subtle glow effect for extended watching */}
        {progress > 0.7 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 2}
            fill="transparent"
            strokeWidth={1}
            className="stroke-primary-400/30 animate-pulse"
          />
        )}
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          className="stroke-gray-200 dark:stroke-gray-700"
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
        
        {/* Inner highlight for 3D effect */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth/2}
          fill="transparent"
          strokeWidth={1}
          strokeOpacity="0.2"
          className="stroke-white dark:stroke-gray-300"
          strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
          strokeDashoffset={circumference * 0.85}
        />
      </svg>
    </div>
  );
}