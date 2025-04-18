import { useState } from "react";
import { Eye, Heart } from "lucide-react";
import { Video } from "@/data/videos";
import WatchControls from "./WatchControls";

interface VideoPlayerProps {
  video: Video;
  watchTime: number;
  watchProgress: number;
}

/**
 * VideoPlayer component
 * 
 * Displays the main video content with:
 * - Thumbnail image with overlay controls
 * - WatchControls for playback and timing
 * - Video metadata (title, description, creator)
 * - Engagement metrics (views, likes)
 * 
 * This component represents the normal watching state in the user journey.
 * 
 * FIGMA EXPORT NOTES:
 * - This is the primary component that houses the video experience
 * - Create with a card-like appearance with rounded corners and subtle shadow
 * - The thumbnail image should use an aspect-video ratio
 * - Include all metadata sections: title, description, creator with avatar
 * - The embedded WatchControls component should be positioned as an overlay
 * - For the Figma prototype, include play/pause toggle states
 */
export default function VideoPlayer({ video, watchTime, watchProgress }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg shadow-animate bg-white dark:bg-gray-800 mb-4">
      {/* Video preview with controls */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
        {/* Video thumbnail */}
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`} 
          className="w-full h-full object-cover"
        />
        
        {/* Watch controls overlay */}
        <WatchControls 
          watchTime={watchTime}
          watchProgress={watchProgress}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
      
      {/* Video information */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">{video.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{video.description}</p>
        
        <div className="flex justify-between items-center mt-3">
          {/* Creator information */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
              <img 
                src={video.creatorAvatar} 
                alt={`${video.creator} avatar`} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="ml-2 text-sm font-medium">{video.creator}</span>
          </div>
          
          {/* Video engagement metrics */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{video.views}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{video.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
