import { Video } from "@/data/videos";

interface RelatedVideoProps {
  video: Video;
}

export default function RelatedVideo({ video }: RelatedVideoProps) {
  return (
    <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{video.creator}</p>
        <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
          <span>{video.duration}</span>
          <span className="mx-1">•</span>
          <span>{video.views} views</span>
        </div>
      </div>
    </div>
  );
}
