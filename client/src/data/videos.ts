export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  creator: string;
  creatorAvatar: string;
  views: string;
  likes: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "How to Practice Mindfulness Daily",
    description: "Learn simple techniques to bring mindfulness into your everyday life",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "24:15",
    creator: "Mindful Living",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "5.2K",
    likes: "320"
  }
];

export const relatedVideos: Video[] = [
  {
    id: "2",
    title: "5-Minute Mindfulness Meditation for Beginners",
    description: "A quick introduction to mindfulness meditation practices",
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
    description: "Improve your sleep quality with breathing exercises",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    duration: "7:15",
    creator: "Sleep Well Channel",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80",
    views: "8.4K",
    likes: "492"
  }
];
