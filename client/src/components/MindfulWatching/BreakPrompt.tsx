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
 * - Create as a bottom-aligned notification card with these properties:
 *   - Fixed position, bottom: 0, z-index: 50
 *   - Background: white/95% with backdrop-blur-lg (frosted glass effect)
 *   - Border: 1px solid with very light gray (border-gray-100) 
 *   - Border radius: 0.75rem (rounded-xl)
 *   - Left accent bar: 4px width, gradient from primary-400 to primary-600
 * - Entrance animation:
 *   - Initial state: translateY(16px), opacity: 0
 *   - Final state: translateY(0), opacity: 1
 *   - Duration: 500ms, ease-in-out timing
 * - Button states:
 *   - "Later" (outline variant): light gray border, gray text, hover: slightly darker
 *   - "Take Break" (primary variant): gradient bg-gradient-to-r from primary-500 to primary-600
 *   - Close button: transparent bg, rounded-full, hover: light gray bg
 * - This component creates a key transition moment in the user flow - it should be
 *   visually distinct but not disruptive to the video watching experience
 */
export default function BreakPrompt({ visible, onDismiss, onTakeBreak }: BreakPromptProps) {
  if (!visible) return null;
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "px-4 py-3 mx-auto max-w-md",
      "transform transition-all duration-500 ease-in-out",
      "animate-in fade-in slide-in-from-bottom-4"
    )}>
      <div className={cn(
        "bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-lg",
        "p-4 border border-gray-100 dark:border-gray-700/50",
        "flex items-center justify-between",
        "relative overflow-hidden"
      )}>
        {/* Decorative accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600"></div>
        
        {/* Content with subtle spacing */}
        <div className="flex-1 pl-3">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Time for a mindful break?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-snug">
            You've been watching for a while. Taking a short break now can help reduce eye strain.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-gray-200 dark:border-gray-700 h-9"
          >
            Later
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={onTakeBreak}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white h-9 shadow-sm"
          >
            Take Break
          </Button>
        </div>
        
        <button 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors" 
          onClick={onDismiss}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}