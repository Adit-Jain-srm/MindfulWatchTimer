import { Play, Pause } from "lucide-react";
import ProgressRing from "./ProgressRing";
import TimerBadge from "./TimerBadge";
import { Video } from "@/data/videos";

interface WatchControlsProps {
  watchTime: number;
  watchProgress: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  video?: Video;
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
  onPlayPause = () => {},
  video
}: WatchControlsProps) {

  return (
    <div className="relative w-full h-full">
      {/* Timer badge in the top-right corner */}
      <TimerBadge time={watchTime} progress={watchProgress} />
      
      {/* Semi-transparent overlay for better control visibility */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Progress ring with play/pause button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative transform hover:scale-105 transition-transform duration-200">
          <ProgressRing progress={watchProgress} onClick={onPlayPause} />
          
          {/* Play/Pause icon */}
          <button 
            onClick={onPlayPause}
            className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full h-14 w-14 shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            ) : (
              <Play className="h-6 w-6 text-primary-600 dark:text-primary-400 ml-0.5" />
            )}
          </button>
        </div>
      </div>
      
      {/* YouTube-like time remaining (bottom-right corner) */}
      {video && (
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
          {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, '0')} / {video.duration}
        </div>
      )}
    </div>
  );
}