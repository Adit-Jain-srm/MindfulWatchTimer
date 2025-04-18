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
 * 
 * FIGMA EXPORT NOTES:
 * - Create as a small badge in top-right corner of the video player
 * - Create at least 4 variants with different opacity levels:
 *   1. 0-40% progress: opacity-100 (fully visible)
 *   2. 40-70% progress: opacity-80 (slightly faded)
 *   3. 70-90% progress: opacity-60 (more faded)
 *   4. 90-100% progress: opacity-40 (significantly faded)
 * - The time format should be MM:SS (e.g., "10:45")
 * - Use consistent semi-transparent black background for light/dark compatibility
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
        "absolute top-3 right-3 z-10",
        "bg-black/75 backdrop-blur-sm text-white px-2 py-1 rounded",
        "text-xs font-medium transition-all duration-1000",
        "shadow-sm border border-white/10",
        getOpacity()
      )}
    >
      <span className="flex items-center">
        {/* Small clock icon */}
        <svg className="w-3 h-3 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {formatTime(time)}
      </span>
    </div>
  );
}