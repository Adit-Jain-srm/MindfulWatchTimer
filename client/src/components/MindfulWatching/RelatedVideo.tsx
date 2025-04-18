import { Video } from "@/data/videos";
import { cn } from "@/lib/utils";

interface RelatedVideoProps {
  video: Video;
}

/**
 * RelatedVideo component
 * 
 * Displays a single related video item:
 * - Thumbnail with duration indicator
 * - Title, creator, and metadata
 * - Hover effect for interaction feedback
 * 
 * This component represents individual video suggestions
 * in the related content section.
 */
export default function RelatedVideo({ video }: RelatedVideoProps) {
  return (
    <div className={cn(
      "flex mb-3 rounded-lg overflow-hidden shadow-animate",
      "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
      "transition-all duration-300"
    )}>
      {/* Thumbnail with duration */}
      <div className="relative w-24 h-16 flex-shrink-0">
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      
      {/* Video details */}
      <div className="p-2 flex-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
          {video.title}
        </h3>
        
        <div className="flex flex-col mt-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {video.creator}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {video.views} views
          </span>
        </div>
      </div>
    </div>
  );
}