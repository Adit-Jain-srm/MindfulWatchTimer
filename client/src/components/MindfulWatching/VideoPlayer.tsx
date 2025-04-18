import { Video } from "@/data/videos";
import ProgressRing from "./ProgressRing";
import TimerBadge from "./TimerBadge";

interface VideoPlayerProps {
  video: Video;
  watchTime: number;
  watchProgress: number;
}

export default function VideoPlayer({ video, watchTime, watchProgress }: VideoPlayerProps) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg shadow-animate bg-white dark:bg-gray-800 mb-4">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
        <img 
          src={video.thumbnail} 
          alt={`${video.title} thumbnail`} 
          className="w-full h-full object-cover"
        />
        
        <ProgressRing progress={watchProgress} />
        <TimerBadge time={watchTime} progress={watchProgress} />
      </div>
      
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">{video.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{video.description}</p>
        
        <div className="flex justify-between items-center mt-3">
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
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{video.views}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{video.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
