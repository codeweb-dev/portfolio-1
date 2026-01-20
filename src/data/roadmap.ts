export type RoadmapStatus = "done" | "in-progress" | "planning";

export interface RoadmapItem {
  version: string;
  title: string;
  status: RoadmapStatus;
  description: string;
  highlights: string[];
}

export const ROADMAP: RoadmapItem[] = [
  {
    version: "v1.0",
    title: "Initial Deployment & Welcome Experience",
    status: "done",
    description:
      "The very first public release of my personal portfolio. This version focuses on performance, clarity, and a strong first impression.",
    highlights: [
      "Clean hero section with personal branding",
      "Welcome message and short introduction",
      "Projects, skills, education, and contact sections",
      "Optimized layout for desktop and mobile",
      "Subtle animations and modern UI components",
    ],
  },
  {
    version: "v1.1",
    title: "Feedback System & Public Reviews",
    status: "in-progress",
    description:
      "An interactive feedback experience where visitors can leave ratings and reviews, and others can browse real opinions about my work.",
    highlights: [
      "Dedicated feedback page",
      "Average rating & total feedback stats",
      "Inspired by iOS / Android native UI patterns",
      "Smooth transitions and minimal card layouts",
      "Focus on readability and trust",
    ],
  },
  {
    version: "v1.2",
    title: "Dynamic Blog & Gallery",
    status: "planning",
    description:
      "Currently, blog posts and gallery items are static. This update will transform them into fully dynamic, interactive experiences.",
    highlights: [
      "Dynamic blog system",
      "Gallery powered by real data",
      "User reactions (likes / hearts)",
      "Comment system with clean UI",
      "Better content discoverability",
    ],
  },
  {
    version: "v1.x",
    title: "Future Enhancements",
    status: "planning",
    description:
      "Beyond these updates, the portfolio will continue to evolve as I explore new ideas and technologies.",
    highlights: [
      "Performance & accessibility improvements",
      "UI/UX refinements",
      "New sections and experiments",
      "More interactions and micro-animations",
      "Continuous polishing and iteration",
    ],
  },
];
