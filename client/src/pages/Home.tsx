import { useState, useEffect } from "react";
import AppHeader from "@/components/MindfulWatching/AppHeader";
import VideoPlayer from "@/components/MindfulWatching/VideoPlayer";
import NextButtonNudge from "@/components/MindfulWatching/NextButtonNudge";
import BreakPrompt from "@/components/MindfulWatching/BreakPrompt";
import BreakTimer from "@/components/MindfulWatching/BreakTimer";
import { videos, relatedVideos } from "@/data/videos";
import useWatchTimer from "@/hooks/useWatchTimer";

export default function Home() {
  const [currentVideo] = useState(videos[0]);
  const { 
    watchTime,
    watchProgress,
    showBreakPrompt,
    handleDismissBreak,
    handleTakeBreak,
    isLongWatching,
    isOnBreak,
    handleSkipBreak,
    handleCompleteBreak
  } = useWatchTimer();

  // Duration of break in seconds (2 minutes)
  const BREAK_DURATION = 120;

  return (
    <div className="max-w-md mx-auto p-4 h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <AppHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center">
        <VideoPlayer 
          video={currentVideo}
          watchTime={watchTime}
          watchProgress={watchProgress}
        />
        
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Continue Watching</h3>
            <button className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              See All
            </button>
          </div>
          
          <div className="space-y-4">
            {relatedVideos.map((video, index) => (
              <NextButtonNudge 
                key={video.id}
                video={video}
                isLongWatching={index === 0 ? isLongWatching : false}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Show break prompt only when not already on break */}
      {!isOnBreak && (
        <BreakPrompt 
          visible={showBreakPrompt} 
          onDismiss={handleDismissBreak} 
          onTakeBreak={handleTakeBreak} 
        />
      )}
      
      {/* Break Timer */}
      <BreakTimer 
        visible={isOnBreak}
        breakDuration={BREAK_DURATION}
        onSkip={handleSkipBreak}
        onComplete={handleCompleteBreak}
      />
    </div>
  );
}
