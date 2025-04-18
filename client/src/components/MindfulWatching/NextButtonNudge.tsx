import { ArrowRight } from "lucide-react";
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
 */
export default function NextButtonNudge({ video, isLongWatching }: NextButtonNudgeProps) {
  return (
    <div className={cn(
      "rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900",
      "border border-gray-200 dark:border-gray-800",
      "transition-all duration-500",
      isLongWatching && "animate-expand"
    )}>
      {/* Next video information */}
      <div className="flex items-center p-3">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={`${video.title} thumbnail`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Video details */}
        <div className="ml-3 flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
            {video.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {video.creator} • {video.views} views
          </p>
        </div>
        
        {/* Next button */}
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "ml-2 rounded-full",
            "bg-primary-100 hover:bg-primary-200",
            "dark:bg-primary-900/20 dark:hover:bg-primary-900/40",
            isLongWatching && "animate-pulse"
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}