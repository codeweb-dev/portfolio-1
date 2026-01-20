import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import HeartButton from "../HeartButton";
import { Eye } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

type Props = {
  stats: {
    views: number;
    hearts: number;
  };
  totalItems: number;
};

export default function GalleryHeader({ stats, totalItems }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <Eye className="size-3.5 mr-2" />
            {stats.views.toLocaleString()} Gallery Views
          </Badge>

          <HeartButton slug="gallery" initialHearts={stats.hearts} />
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Gallery{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {totalItems} photos
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Travel memories, quiet moments, and visual stories.
        </p>
      </BlurFade>
    </section>
  );
}
