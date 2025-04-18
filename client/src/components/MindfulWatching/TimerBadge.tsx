import { useMemo } from "react";

interface TimerBadgeProps {
  time: number; // in seconds
  progress: number; // 0 to 1
}

export default function TimerBadge({ time, progress }: TimerBadgeProps) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);
  
  // Opacity decreases as time progresses
  const opacity = useMemo(() => {
    return Math.max(1 - (progress * 0.7), 0.3);
  }, [progress]);
  
  return (
    <div 
      className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm"
      style={{ 
        opacity,
        transition: "opacity 0.3s ease"
      }}
    >
      {formattedTime}
    </div>
  );
}
