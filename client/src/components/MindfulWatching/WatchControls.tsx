import { Play, Pause } from "lucide-react";
import ProgressRing from "./ProgressRing";
import TimerBadge from "./TimerBadge";

interface WatchControlsProps {
  watchTime: number;
  watchProgress: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
}

/**
 * WatchControls component
 * 
 * Displays the video player controls including:
 * - Play/pause button centered in a progress ring
 * - Timer badge showing elapsed watch time
 * - Progress ring that changes color based on watch duration
 * 
 * The progress ring serves as a subtle indicator of extended viewing sessions,
 * changing color as watch time increases to encourage mindful watching habits.
 */
export default function WatchControls({
  watchTime,
  watchProgress,
  isPlaying = true,
  onPlayPause = () => {}
}: WatchControlsProps) {

  return (
    <div className="relative w-full h-full">
      {/* Timer badge in the top-right corner */}
      <TimerBadge time={watchTime} progress={watchProgress} />
      
      {/* Progress ring with play/pause button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <ProgressRing progress={watchProgress} onClick={onPlayPause} />
          
          {/* Play/Pause icon */}
          <button 
            onClick={onPlayPause}
            className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full h-12 w-12 shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-primary-700 dark:text-primary-400" />
            ) : (
              <Play className="h-6 w-6 text-primary-700 dark:text-primary-400 ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}