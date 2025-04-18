import { useState, useEffect } from "react";
import AppHeader from "@/components/MindfulWatching/AppHeader";
import VideoPlayer from "@/components/MindfulWatching/VideoPlayer";
import NextButtonNudge from "@/components/MindfulWatching/NextButtonNudge";
import BreakPrompt from "@/components/MindfulWatching/BreakPrompt";
import BreakTimer from "@/components/MindfulWatching/BreakTimer";
import RelatedVideo from "@/components/MindfulWatching/RelatedVideo";
import { videos, relatedVideos } from "@/data/videos";
import useWatchTimer from "@/hooks/useWatchTimer";

/**
 * Home component - Main Page
 * 
 * The primary container for the Mindful Watching application that:
 * - Orchestrates the different components and their states
 * - Manages the overall user flow and experience
 * - Transitions between different visual states based on watch time
 * 
 * Visual States:
 * 1. Normal Watch Mode: Video player with minimal UI elements
 * 2. Extended Watch: Progress indicators change color, related content expands
 * 3. Break Prompt: Non-intrusive notification appears after threshold
 * 4. Active Break: Full-screen break timer with breathing animation
 * 5. Post-Break: Return to watching with reset timers
 */
export default function Home() {
  const [currentVideo] = useState(videos[0]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading videos with a delay 
  // This would be a real API call in a production application
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Custom hook that manages all time-related states and handlers
  const { 
    watchTime,           // Current watch time in seconds
    watchProgress,       // Progress from 0 to 1 representing watch session progress
    showBreakPrompt,     // Whether to show the break suggestion prompt
    handleDismissBreak,  // Handler for dismissing the break prompt
    handleTakeBreak,     // Handler for accepting the break suggestion
    isLongWatching,      // Boolean indicating extended viewing session
    isOnBreak,           // Boolean indicating if user is currently on break
    handleSkipBreak,     // Handler for skipping the current break
    handleCompleteBreak  // Handler for completing the break and returning to video
  } = useWatchTimer();

  // Duration of break in seconds (2 minutes)
  const BREAK_DURATION = 120;

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Header with app title and theme toggle */}
      <AppHeader />
      
      {/* Main content area */}
      <main className="flex-1 flex flex-col px-4 py-3 overflow-y-auto scrollbar-hide">
        {/* Primary video player with time-based UI elements */}
        <div className="mb-5">
          <VideoPlayer 
            video={currentVideo}
            watchTime={watchTime}
            watchProgress={watchProgress}
          />
        </div>
        
        {/* Related content section */}
        <div className="w-full">
          {/* Section header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-semibold text-base tracking-tight">Continue Watching</h3>
            <button className="text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center">
              See All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Primary next video with nudge animation or loading skeleton */}
          <div className="mb-5">
            {isLoading ? (
              <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 shadow-sm animate-pulse">
                <div className="p-3 flex items-center">
                  {/* Thumbnail skeleton */}
                  <div className="relative w-20 h-[70px] rounded-md bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                  
                  {/* Content skeleton */}
                  <div className="ml-3 flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                  
                  {/* Button skeleton */}
                  <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 ml-2"></div>
                </div>
              </div>
            ) : (
              <NextButtonNudge 
                video={relatedVideos[0]}
                isLongWatching={isLongWatching}
              />
            )}
          </div>
          
          {/* Additional related videos or loading skeletons */}
          <div className="space-y-3 mb-5">
            {isLoading ? (
              /* Skeleton loaders for related videos */
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex mb-3 rounded-lg overflow-hidden animate-pulse">
                  {/* Thumbnail skeleton with shimmer effect */}
                  <div className="relative w-24 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]"></div>
                  
                  {/* Content skeleton */}
                  <div className="p-2 flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : (
              /* Actual related videos */
              relatedVideos.slice(1).map((video) => (
                <RelatedVideo 
                  key={video.id}
                  video={video}
                />
              ))
            )}
          </div>
        </div>
      </main>
      
      {/* BREAK SUGGESTION UI - appears after extended viewing */}
      {!isOnBreak && (
        <BreakPrompt 
          visible={showBreakPrompt} 
          onDismiss={handleDismissBreak} 
          onTakeBreak={handleTakeBreak} 
        />
      )}
      
      {/* BREAK TIMER UI - full-screen experience when on break */}
      <BreakTimer 
        visible={isOnBreak}
        breakDuration={BREAK_DURATION}
        onSkip={handleSkipBreak}
        onComplete={handleCompleteBreak}
      />
    </div>
  );
}
