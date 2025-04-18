import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function AppHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-xl font-semibold text-primary-700 dark:text-primary-400">
        Mindful Watching
      </h1>
      
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-primary-400" />
        ) : (
          <Sun className="h-5 w-5 text-primary-700" />
        )}
      </button>
    </header>
  );
}
