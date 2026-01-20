import { GALLERY_ITEMS } from "./gallery-data";
import GalleryHeader from "./GalleryHeader";
import GalleryClient from "./GalleryClient";
import RegisterView from "../RegisterView";
import { getStats } from "@/lib/stats";

export default async function Gallery() {
  const stats = await getStats("gallery");
  const totalItems = GALLERY_ITEMS.length;

  return (
    <>
      <RegisterView slug="gallery" />
      
      <section id="gallery">
        <GalleryHeader stats={stats} totalItems={totalItems} />
        <GalleryClient />
      </section>
    </>
  );
}
