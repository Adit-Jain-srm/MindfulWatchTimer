import { useState, useEffect, useCallback } from "react";

/**
 * Interface for the return value of useWatchTimer hook
 * Contains all states and handlers needed for the time-based UI interactions
 */
interface UseWatchTimerReturn {
  watchTime: number;           // Current watch time in seconds
  watchProgress: number;       // Normalized progress (0-1) representing watch session
  showBreakPrompt: boolean;    // Whether to display the break suggestion prompt
  isLongWatching: boolean;     // Whether user has been watching for extended period
  isOnBreak: boolean;          // Whether user is currently on a break
  handleDismissBreak: () => void;    // Function to dismiss the break prompt
  handleTakeBreak: () => void;       // Function to initiate a break
  handleSkipBreak: () => void;       // Function to skip the current break
  handleCompleteBreak: () => void;   // Function to complete break and return to video
  resetTimer: () => void;            // Function to reset all timer states
}

/**
 * useWatchTimer Hook
 * 
 * Custom hook that manages all time-related logic for the Mindful Watching feature:
 * - Tracks watch time and converts it to normalized progress
 * - Triggers UI changes at specific time thresholds
 * - Manages the break flow and states
 * - Provides handlers for all user interactions with time-related features
 * 
 * Time-based Triggers:
 * - After 20 min (1200 sec): Show break prompt
 * - After 30 min (1800 sec): Enable UI nudges for switching videos
 * - Progress ring changes color gradually over time
 * - Timer badge fades gradually over time
 */
export default function useWatchTimer(): UseWatchTimerReturn {
  // Core time-tracking states
  const [watchTime, setWatchTime] = useState(0);             // In seconds
  const [watchProgress, setWatchProgress] = useState(0);     // 0 to 1
  
  // UI state flags
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);     // Show break suggestion
  const [breakPromptShown, setBreakPromptShown] = useState(false);   // Track if prompt was shown this session
  const [isLongWatching, setIsLongWatching] = useState(false);       // Extended viewing flag
  const [isOnBreak, setIsOnBreak] = useState(false);                 // Currently on break
  const [isTimerRunning, setIsTimerRunning] = useState(true);        // Timer active/paused

  // Demo acceleration: 1 second = 10 seconds of watching
  // This allows for faster testing/demonstration of the time-based features
  // In a production app, this would be set to 1 (real-time)
  const timeMultiplier = 10;

  // Timer effect: Update watchTime based on timeMultiplier
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning && !isOnBreak) {
        setWatchTime(prev => prev + timeMultiplier);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeMultiplier, isTimerRunning, isOnBreak]);

  // Progress calculation and threshold detection
  useEffect(() => {
    // 25 minutes (1500 seconds) = 100% progress
    const maxTime = 25 * 60;
    const progress = Math.min(watchTime / maxTime, 1);
    setWatchProgress(progress);

    // THRESHOLD 1: Show break prompt at 20 minutes (1200 seconds)
    if (watchTime >= 1200 && !breakPromptShown) {
      setShowBreakPrompt(true);
      setBreakPromptShown(true);
    }

    // THRESHOLD 2: Apply visual changes after 30 minutes (1800 seconds)
    if (watchTime >= 1800) {
      setIsLongWatching(true);
    }
  }, [watchTime, breakPromptShown]);

  // Handler: User dismisses break prompt
  const handleDismissBreak = useCallback(() => {
    setShowBreakPrompt(false);
    // Note: We don't reset breakPromptShown, so it won't appear again this session
  }, []);

  // Handler: User accepts break suggestion
  const handleTakeBreak = useCallback(() => {
    setShowBreakPrompt(false);
    setIsOnBreak(true);
    setIsTimerRunning(false);
  }, []);

  // Handler: User skips break before completion
  const handleSkipBreak = useCallback(() => {
    setIsOnBreak(false);
    setIsTimerRunning(true);
    // Note: We don't reset timer or breakPromptShown here
  }, []);

  // Handler: User completes break normally
  const handleCompleteBreak = useCallback(() => {
    setIsOnBreak(false);
    setIsTimerRunning(true);
    
    // Reset states to create a fresh session after a proper break
    setBreakPromptShown(false);
    setWatchTime(0);
    setWatchProgress(0);
    setIsLongWatching(false);
  }, []);

  // Handler: Complete reset of all timer states
  const resetTimer = useCallback(() => {
    setWatchTime(0);
    setWatchProgress(0);
    setShowBreakPrompt(false);
    setBreakPromptShown(false);
    setIsLongWatching(false);
    setIsOnBreak(false);
    setIsTimerRunning(true);
  }, []);

  // Return all states and handlers
  return {
    watchTime,
    watchProgress,
    showBreakPrompt,
    isLongWatching,
    isOnBreak,
    handleDismissBreak,
    handleTakeBreak,
    handleSkipBreak,
    handleCompleteBreak,
    resetTimer
  };
}
