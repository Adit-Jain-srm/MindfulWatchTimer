import { useState, useEffect, useCallback } from "react";

interface UseWatchTimerReturn {
  watchTime: number;
  watchProgress: number;
  showBreakPrompt: boolean;
  isLongWatching: boolean;
  handleDismissBreak: () => void;
  handleTakeBreak: () => void;
  resetTimer: () => void;
}

export default function useWatchTimer(): UseWatchTimerReturn {
  const [watchTime, setWatchTime] = useState(0); // In seconds
  const [watchProgress, setWatchProgress] = useState(0); // 0 to 1
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [breakPromptShown, setBreakPromptShown] = useState(false);
  const [isLongWatching, setIsLongWatching] = useState(false);

  // For the demo, speed up time (1 second = 10 seconds of watching)
  // In a real app, this would be 1:1 with actual seconds
  const timeMultiplier = 10;

  // Update time and progress
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchTime(prev => prev + timeMultiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeMultiplier]);

  // Calculate progress based on watch time
  useEffect(() => {
    // 25 minutes (1500 seconds) = 100% progress
    const maxTime = 25 * 60;
    const progress = Math.min(watchTime / maxTime, 1);
    setWatchProgress(progress);

    // Show break prompt at 20 minutes (1200 seconds)
    if (watchTime >= 1200 && !breakPromptShown) {
      setShowBreakPrompt(true);
      setBreakPromptShown(true);
    }

    // Apply Next Button Nudge after 30 minutes (1800 seconds)
    if (watchTime >= 1800) {
      setIsLongWatching(true);
    }
  }, [watchTime, breakPromptShown]);

  const handleDismissBreak = useCallback(() => {
    setShowBreakPrompt(false);
  }, []);

  const handleTakeBreak = useCallback(() => {
    setShowBreakPrompt(false);
    // In a real app, you'd implement actual break functionality here
    // For demo, we'll just reset the timer
    setWatchTime(0);
    setWatchProgress(0);
    setBreakPromptShown(false);
    setIsLongWatching(false);
  }, []);

  const resetTimer = useCallback(() => {
    setWatchTime(0);
    setWatchProgress(0);
    setShowBreakPrompt(false);
    setBreakPromptShown(false);
    setIsLongWatching(false);
  }, []);

  return {
    watchTime,
    watchProgress,
    showBreakPrompt,
    isLongWatching,
    handleDismissBreak,
    handleTakeBreak,
    resetTimer
  };
}
