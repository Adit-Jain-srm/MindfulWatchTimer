import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Video } from "@/data/videos";

interface NextButtonNudgeProps {
  video: Video;
  isLongWatching: boolean;
}

/**
 * NextButtonNudge component
 * 
 * Displays a suggestion for the next video that:
 * - Becomes more prominent during long viewing sessions
 * - Uses animation to gently expand and draw attention
 * - Provides a seamless way to continue to related content
 * 
 * The expansion animation serves as a subtle encouragement
 * to switch videos after extended viewing of the same content.
 * 
 * FIGMA EXPORT NOTES:
 * - Create two main variants of this component:
 *   1. Normal state (isLongWatching=false): 
 *      - Standard appearance, no animation
 *      - Shows thumbnail, title, creator info
 *      - Next button is static
 *   2. Nudge state (isLongWatching=true): 
 *      - Expanded with padding: padding: 4px, margin: 4px 0
 *      - Pulsing next button (animate-pulse)
 *      - Active progress bar at bottom (w-1/2 animated)
 *      - Play icon overlay on thumbnail (with animate-pulse)
 * - Visual properties:
 *   - Container: rounded-xl, bg-white/dark:bg-gray-800
 *   - Border: light gray border (border-gray-100/dark:border-gray-700/50)
 *   - Thumbnail: w-20 h-[70px], rounded-md with absolute duration badge
 *   - Next button: rounded-full with gradient background
 *   - Progress bar: 0.5px height, gradient from primary-400 to primary-500
 * - Animation specifications:
 *   - Expansion keyframes: padding/margin 0px → 4px over 0.5s
 *   - Next button pulse: subtle scale animation (1.0-1.05) with opacity change
 *   - Progress indicator: pulse animation with 50% width
 * - Smart animate between the two states to show the transition when watching time exceeds threshold
 * - This component is a key visual cue for encouraging content variety during long sessions
 */
export default function NextButtonNudge({ video, isLongWatching }: NextButtonNudgeProps) {
  return (
    <div className={cn(
      "rounded-xl overflow-hidden bg-white dark:bg-gray-800",
      "border border-gray-100 dark:border-gray-700/50",
      "transition-all duration-500 shadow-sm hover:shadow",
      isLongWatching && "animate-expand"
    )}>
      {/* Next video information */}
      <div className="flex items-center p-3">
        {/* Thumbnail with duration tag */}
        <div className="relative w-20 h-[70px] rounded-md overflow-hidden flex-shrink-0 shadow-sm">
          <img
            src={video.thumbnail}
            alt={`${video.title} thumbnail`}
            className="w-full h-full object-cover"
          />
          
          {/* Duration badge */}
          <div className="absolute bottom-1 right-1 bg-black/75 text-white text-xs px-1 py-0.5 rounded text-[10px] font-medium">
            {video.duration}
          </div>
          
          {/* Play icon overlay */}
          {isLongWatching && (
            <div className={cn(
              "absolute inset-0 bg-black/30 flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity"
            )}>
              <div className="bg-white/90 rounded-full p-1 shadow-sm animate-pulse">
                <Play className="h-3 w-3 text-gray-800" />
              </div>
            </div>
          )}
        </div>
        
        {/* Video details */}
        <div className="ml-3 flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate leading-tight">
            {video.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {video.creator}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {video.views} views
          </p>
        </div>
        
        {/* Next button */}
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "ml-2 rounded-full h-9 w-9",
            "bg-gradient-to-br from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300",
            "dark:from-primary-900/20 dark:to-primary-900/30 dark:hover:from-primary-900/30 dark:hover:to-primary-900/40",
            "shadow-sm",
            isLongWatching && "animate-pulse"
          )}
        >
          <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </Button>
      </div>
      
      {/* Subtle watching indicator for long watching */}
      {isLongWatching && (
        <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700/30">
          <div className="h-full bg-primary-400 dark:bg-primary-500 w-1/2 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}