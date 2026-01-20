import Gallery from "@/components/gallery/Gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A collection of my favorite images and artwork.",
  openGraph: {
    title: "Gallery",
    description: "A collection of my favorite images and artwork.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery",
    description: "A collection of my favorite images and artwork.",
  },
};

export default function Page() {
  return <Gallery />;
}
