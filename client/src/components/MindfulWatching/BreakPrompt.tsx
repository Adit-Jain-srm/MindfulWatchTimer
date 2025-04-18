import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreakPromptProps {
  visible: boolean;
  onDismiss: () => void;
  onTakeBreak: () => void;
}

export default function BreakPrompt({ visible, onDismiss, onTakeBreak }: BreakPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Auto-dismiss after 10 seconds
  useEffect(() => {
    let timeoutId: number;
    
    if (visible && !isVisible) {
      setIsVisible(true);
    } else if (!visible && isVisible) {
      timeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match transition duration
    }
    
    // Auto-dismiss after 10 seconds
    if (visible) {
      timeoutId = window.setTimeout(() => {
        onDismiss();
      }, 10000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible, isVisible, onDismiss]);
  
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 transform transition-all duration-300 p-4 z-50",
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-3 flex items-center justify-between border-l-4 border-primary-600 dark:border-primary-500">
        <div className="flex items-center">
          <Timer className="text-primary-600 dark:text-primary-400 mr-3 h-5 w-5" />
          <p className="text-sm font-medium">
            You've been watching for 20 minutes. Time for a short break?
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <button 
            onClick={onDismiss} 
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Later
          </button>
          <button 
            onClick={onTakeBreak} 
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Take Break
          </button>
        </div>
      </div>
    </div>
  );
}
