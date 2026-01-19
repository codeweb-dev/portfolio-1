import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { Badge } from "./ui/badge";

type BlogHeaderProps = {
  title: string;
  publishedAt: string;
  author?: string;
  image?: string;
  readingTime: string;
  category?: string;
};

export function BlogHeader({
  title,
  publishedAt,
  author = DATA.name,
  image,
  readingTime,
  category,
}: BlogHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {DATA.avatarUrl && (
              <Image
                src={DATA.avatarUrl}
                alt={author}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{author}</span>
          </div>

          <div className="hidden md:inline">
            <span>·</span>
            <span>{formatDate(publishedAt)}</span>
          </div>
          <span>·</span>
          <span>{readingTime}</span>
          <div className="hidden md:inline">
            <span>·</span>
            {category && <Badge variant="outline">{category}</Badge>}
          </div>
        </div>
      </div>

      {image && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
