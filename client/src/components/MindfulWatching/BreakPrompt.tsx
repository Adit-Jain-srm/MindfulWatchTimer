import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreakPromptProps {
  visible: boolean;
  onDismiss: () => void;
  onTakeBreak: () => void;
}

/**
 * BreakPrompt component
 * 
 * Displays a non-intrusive notification suggesting a break:
 * - Appears after extended viewing (typically 20 minutes)
 * - Offers options to take a break or continue watching
 * - Uses subtle entrance animation
 * - Designed to be supportive rather than interrupting
 * 
 * FIGMA EXPORT NOTES:
 * - Create as a bottom-aligned notification card
 * - Use slide-up and fade-in animations for entrance
 * - Add interaction states for both buttons (Later and Take Break)
 * - Include hover states for the close button
 * - This component is a key transition point in the user journey flow
 */
export default function BreakPrompt({ visible, onDismiss, onTakeBreak }: BreakPromptProps) {
  if (!visible) return null;
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "p-4 mx-auto max-w-md",
      "transform transition-all duration-500 ease-in-out",
      "animate-in fade-in slide-in-from-bottom-4"
    )}>
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-xl",
        "p-4 border border-gray-200 dark:border-gray-700",
        "flex items-center justify-between"
      )}>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Time for a break?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You've been watching for a while. A short break might be refreshing.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Later
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={onTakeBreak}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            Take Break
          </Button>
        </div>
        
        <button 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" 
          onClick={onDismiss}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}