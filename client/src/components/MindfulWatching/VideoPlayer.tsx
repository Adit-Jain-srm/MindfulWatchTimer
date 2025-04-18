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
  
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-sm dark:shadow-gray-800/10 bg-white dark:bg-gray-800">
      {/* Video preview with controls */}
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden shadow-md group touch-manipulation">
        {/* Playful loader for image loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
            <div className="relative">
              {/* Animated circles in background */}
              <div className="absolute -inset-16">
                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-primary-200/30 dark:bg-primary-800/20 animate-ping-slow"></div>
                <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-primary-300/20 dark:bg-primary-700/20 animate-ping-slower"></div>
                <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-primary-400/20 dark:bg-primary-600/20 animate-ping-slow"></div>
              </div>
              
              {/* Main loading animation */}
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-primary-500 border-gray-200 dark:border-gray-700 animate-spin-slow"></div>
                
                {/* Playful play icon that bounces */}
                <div className="absolute inset-0 flex items-center justify-center animate-bounce-subtle">
                  <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Loading text */}
                <div className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Loading video...
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Video thumbnail - positioned absolutely to maintain aspect ratio */}
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`} 
          onLoad={() => setIsLoading(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Duration badge (YouTube-style) */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium z-10">
          {video.duration}
        </div>
        
        {/* Play/Pause hover overlay */}
        <div 
          className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
              {isPlaying ? (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* Watch controls overlay */}
        <WatchControls 
          watchTime={watchTime}
          watchProgress={watchProgress}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          video={video}
        />
        
        {/* Bottom progress bar - YouTube style */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 dark:bg-gray-700/50">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-500 transition-all duration-300"
            style={{ width: `${watchProgress * 100}%` }}
          />
        </div>
      </div>
      
      {/* Video information */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2 leading-snug tracking-tight line-clamp-2">{video.title}</h2>
        
        <div className="flex justify-between items-center mb-3">
          {/* Video engagement metrics */}
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span>{video.views}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span>{video.likes}</span>
            </div>
          </div>
          
          {/* Action buttons - for aesthetics */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700/50">
          {/* Creator information */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-sm">
              <img 
                src={video.creatorAvatar} 
                alt={`${video.creator} avatar`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium">{video.creator}</span>
              <p className="text-xs text-gray-500 dark:text-gray-500">Creator</p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
