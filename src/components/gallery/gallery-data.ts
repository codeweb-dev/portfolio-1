export type Category = "All" | "Travel" | "Nature" | "Lifestyle" | "Urban";

export const CATEGORY_EMOJI: Record<string, string> = {
  Nature: "🌿",
  Travel: "🌄",
  Lifestyle: "👥",
  Urban: "🏙️",
};

export const GALLERY_ITEMS = [
  {
    src: "/gallery/flowers.jpg",
    title: "Morning Blooms",
    description:
      "Fresh pink roses blooming quietly in the garden, a calm reminder of how beautiful simple moments can be.",
    category: "Nature",
  },
  {
    src: "/gallery/classmate.jpg",
    title: "Shared Journeys",
    description:
      "A quick stop with classmates during a trip — laughter, conversations, and memories captured in between destinations.",
    category: "Lifestyle",
  },
  {
    src: "/gallery/me.jpg",
    title: "Quiet Moments",
    description:
      "A personal moment taken during a foggy morning, reflecting calmness, growth, and time spent with myself.",
    category: "Lifestyle",
  },
  {
    src: "/gallery/group-pic.jpg",
    title: "Together at the Viewpoint",
    description:
      "A group photo taken at the viewpoint, capturing friendship, travel excitement, and shared experiences.",
    category: "Travel",
  },
  {
    src: "/gallery/mall.jpg",
    title: "City Lines",
    description:
      "A modern city view with clean architecture, captured during a peaceful afternoon walk around town.",
    category: "Urban",
  },
  {
    src: "/gallery/random.jpg",
    title: "Ferris Wheel Afternoon",
    description:
      "A ferris wheel rising above the trees, reminding me to slow down and enjoy the view from where I stand.",
    category: "Travel",
  },
  {
    src: "/gallery/random1.jpg",
    title: "Clouds Over the Hills",
    description:
      "A wide view of hills and distant waters under dramatic clouds, capturing the quiet beauty of nature.",
    category: "Nature",
  },
];
