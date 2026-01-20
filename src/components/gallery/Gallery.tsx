import GalleryHeader from "./GalleryHeader";
import GalleryClient from "./GalleryClient";
import { getStats } from "@/lib/stats";

export default async function Gallery() {
  const stats = await getStats("gallery");

  return (
    <section id="gallery">
      <GalleryHeader stats={stats} />
      <GalleryClient />
    </section>
  );
}
