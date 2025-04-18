import { cn } from "@/lib/utils";

interface TimerBadgeProps {
  time: number; // in seconds
  progress: number; // 0 to 1
}

/**
 * TimerBadge component
 * 
 * Displays a timer badge showing the elapsed watch time that:
 * - Formats the time in minutes:seconds format
 * - Gradually fades as the session progresses
 * - Provides a visual indicator of session length
 * 
 * The opacity fading serves as a subtle reminder of
 * prolonged viewing sessions without being intrusive.
 */
export default function TimerBadge({ time, progress }: TimerBadgeProps) {
  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate opacity based on progress (fades out gradually)
  const getOpacity = () => {
    if (progress < 0.4) return "opacity-100";
    if (progress < 0.7) return "opacity-80";
    if (progress < 0.9) return "opacity-60";
    return "opacity-40";
  };

  return (
    <div 
      className={cn(
        "absolute top-2 right-2 z-10",
        "bg-black/70 text-white px-2 py-1 rounded-md",
        "text-xs font-medium transition-opacity duration-1000",
        getOpacity()
      )}
    >
      {formatTime(time)}
    </div>
  );
}