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
      "border-b border-gray-200 dark:border-gray-800",
      "py-3 px-4 sticky top-0 z-10"
    )}>
      <div className="container mx-auto max-w-md flex justify-between items-center">
        {/* App logo and title */}
        <div className="flex items-center">
          <div className="bg-primary-500 text-white p-1.5 rounded-md mr-2">
            <VideoIcon size={18} />
          </div>
          <h1 className="font-semibold text-gray-900 dark:text-white">
            Mindful Watching
          </h1>
        </div>
        
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="rounded-full p-2 h-auto w-auto"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === "light" ? (
            <Moon size={18} className="text-gray-700" />
          ) : (
            <Sun size={18} className="text-gray-300" />
          )}
        </Button>
      </div>
    </header>
  );
}