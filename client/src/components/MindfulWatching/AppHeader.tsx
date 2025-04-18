import { useState, useEffect } from "react";
import { Moon, Sun, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * AppHeader component
 * 
 * Displays the application header with:
 * - App logo and title
 * - Theme toggle button (light/dark mode)
 * 
 * This component provides consistent navigation and theming
 * controls across the application.
 */
export default function AppHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Check system preference on initial load
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkMode) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(current => {
      const newTheme = current === "light" ? "dark" : "light";
      
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newTheme;
    });
  };
  
  return (
    <header className={cn(
      "bg-white dark:bg-gray-900",
      "border-b border-gray-100 dark:border-gray-800/50",
      "py-3 px-4 sticky top-0 z-10",
      "backdrop-blur-sm bg-white/90 dark:bg-gray-900/90"
    )}>
      <div className="container mx-auto max-w-md flex justify-between items-center">
        {/* App logo and title */}
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-1.5 rounded-md mr-2 shadow-sm">
            <VideoIcon size={18} />
          </div>
          <h1 className="font-semibold text-gray-900 dark:text-white tracking-tight">
            Mindful Watching
          </h1>
        </div>
        
        {/* Action buttons area */}
        <div className="flex items-center space-x-2">
          {/* Search icon - just for aesthetics */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 h-9 w-9 text-gray-600 dark:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
          
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-full p-2 h-9 w-9 text-gray-600 dark:text-gray-300"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}