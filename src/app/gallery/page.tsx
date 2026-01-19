"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Eye, Heart, X } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

type Category = "All" | "Travel" | "Nature" | "Lifestyle";

const CATEGORY_EMOJI: Record<string, string> = {
  Nature: "🌿",
  Travel: "🌄",
  Lifestyle: "👥",
  Urban: "🏙️",
};

const GALLERY_ITEMS = [
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

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (activeIndex === null) return;

      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : prev,
        );
      if (e.key === "ArrowLeft")
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, filteredItems.length]);

  return (
    <main className="min-h-dvh max-w-6xl mx-auto px-4 flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Eye className="size-3.5 mr-2" />
              23,000+ Gallery Views
            </Badge>

            <Badge variant="outline">
              <Heart className="size-3.5 mr-2" />
              450
            </Badge>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="text-muted-foreground max-w-xl">
            Travel memories, quiet moments, and visual stories.
          </p>
        </BlurFade>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <section className="flex gap-2 flex-wrap">
          {["All", "Travel", "Nature", "Lifestyle"].map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category as Category)}
              className="transition cursor-pointer select-none"
            >
              {category}
            </Badge>
          ))}
        </section>
      </BlurFade>

      <section className="columns-1 md:columns-2 gap-6 space-y-6">
        {filteredItems.map((item, index) => (
          <BlurFade key={item.src} delay={BLUR_FADE_DELAY * 3 + index * 0.05}>
            <div
              onClick={() => setActiveIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border bg-background shadow-sm"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-black/80 via-black/40 to-transparent md:hidden" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 md:hidden">
                <Badge variant="secondary" className="w-fit mb-2">
                  {CATEGORY_EMOJI[item.category]} {item.category}
                </Badge>

                <h3 className="font-semibold text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="absolute inset-0 hidden md:flex flex-col justify-end p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                <Badge variant="secondary" className="w-fit mb-2">
                  {CATEGORY_EMOJI[item.category]} {item.category}
                </Badge>
                <h3 className="font-semibold text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </section>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={() => setActiveIndex(null)}
      >
        {activeIndex !== null && (
          <DialogContent className="w-full max-w-full md:w-auto max-h-[95vh] p-0 overflow-hidden flex justify-center">
            <div className="flex flex-col min-h-0 md:inline-flex">
              <div className="relative flex justify-center md:inline-flex max-h-[75vh] overflow-hidden">
                <Image
                  src={filteredItems[activeIndex].src}
                  alt={filteredItems[activeIndex].title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="object-contain h-auto max-h-[75vh]"
                />
              </div>

              <Separator />

              <div className="relative w-full md:w-auto px-6 py-5 flex flex-col gap-3 overflow-y-auto min-h-0 max-h-[35vh]">
                <BlurFade delay={BLUR_FADE_DELAY + 0.1}>
                  <Badge className="w-fit flex items-center gap-1">
                    {CATEGORY_EMOJI[filteredItems[activeIndex].category]}
                    {filteredItems[activeIndex].category}
                  </Badge>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY + 0.12}>
                  <DialogTitle className="flex items-center gap-2">
                    <span>
                      {CATEGORY_EMOJI[filteredItems[activeIndex].category]}
                    </span>
                    {filteredItems[activeIndex].title}
                  </DialogTitle>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY + 0.14}>
                  <DialogDescription className="whitespace-pre-wrap">
                    {filteredItems[activeIndex].description}
                  </DialogDescription>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY + 0.16}>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <ArrowRight className="h-3 w-3" />
                      <span>Navigate</span>
                    </Badge>

                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      <span>Esc</span>
                    </Badge>
                  </div>
                </BlurFade>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
