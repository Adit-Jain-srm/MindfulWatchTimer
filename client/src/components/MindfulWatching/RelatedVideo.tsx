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
      "flex mb-3 rounded-lg overflow-hidden",
      "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer group",
      "transition-all duration-300"
    )}>
      {/* Thumbnail with duration */}
      <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1 py-0.5 rounded font-medium">
          {video.duration}
        </div>
        
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-black/60 flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-white"
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Video details */}
      <div className="py-1 px-2 flex-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
          {video.title}
        </h3>
        
        <div className="flex flex-col mt-1">
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {video.creator}
          </span>
          <div className="flex items-center">
            <span className="text-[10px] text-gray-500 dark:text-gray-500 truncate flex items-center">
              {video.views} views
              <span className="inline-block mx-1 h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
              <span className="inline-block">1 week ago</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}