/**
 * Video Data Model
 * 
 * This interface defines the structure for video content used in the application.
 * It contains all necessary metadata for displaying videos in the UI.
 * 
 * This data model can be used as a reference for creating matching Figma components
 * and for generating sample content when designing the UI.
 */
export interface Video {
  id: string;             // Unique identifier for the video
  title: string;          // Main video title
  description: string;    // Brief description or summary
  thumbnail: string;      // URL to the video thumbnail image
  duration: string;       // Formatted duration (MM:SS)
  creator: string;        // Channel or creator name
  creatorAvatar: string;  // URL to creator's profile image
  views: string;          // Formatted view count (e.g., "5.2K")
  likes: string;          // Formatted like count
}

/**
 * Primary Video Data
 * 
 * This represents the main video that the user is currently watching.
 * For the prototype, we're using a single video but this could be expanded
 * to include multiple options.
 */
export const videos: Video[] = [
  {
    id: "1",
    title: "How to Practice Mindfulness Daily",
    description: "Learn simple techniques to bring mindfulness into your everyday life with these research-backed practices.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "24:15",
    creator: "Mindful Living",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "5.2K",
    likes: "320"
  }
];

/**
 * Related Video Suggestions
 * 
 * This collection represents videos that are related to the main content
 * and appear in the "Continue Watching" section.
 * 
 * The first video in this array receives special treatment in the UI:
 * - It appears in the NextButtonNudge component
 * - It has animated expansion after extended viewing sessions
 */
export const relatedVideos: Video[] = [
  {
    id: "2",
    title: "5-Minute Mindfulness Meditation for Beginners",
    description: "A quick introduction to mindfulness meditation practices that anyone can follow",
    thumbnail: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    duration: "4:32",
    creator: "Mindful Living",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "3.1K",
    likes: "182"
  },
  {
    id: "3",
    title: "Mindful Breathing Techniques for Better Sleep",
    description: "Improve your sleep quality with these simple breathing exercises anyone can do",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    duration: "7:15",
    creator: "Sleep Well Channel",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "8.4K",
    likes: "492"
  },
  {
    id: "4",
    title: "Digital Wellbeing: Managing Screen Time",
    description: "Learn how to develop healthier relationship with your devices",
    thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    duration: "12:48",
    creator: "Tech Balance",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "10.7K",
    likes: "856"
  }
];
