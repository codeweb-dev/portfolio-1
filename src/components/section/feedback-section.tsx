/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import BlurFade from "../magicui/blur-fade";
import { Badge } from "../ui/badge";

const BLUR_FADE_DELAY = 0.04;

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));
const thirdRow = firstRow;
const fourthRow = secondRow;

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-36",
      "border-gray-950/10 bg-gray-950/5 hover:bg-gray-950/10",
      "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"
    )}
  >
    <div className="flex items-center gap-2">
      <img
        className="rounded-full"
        width="32"
        height="32"
        alt={name}
        src={img}
      />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export function FeedbackSection() {
  return (
    <section id="feedback">
      <div className="flex flex-col gap-y-10">
        {/* Header */}
        <div className="flex flex-col gap-y-4 items-center text-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Feedback
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            What clients say
          </h2>

          <p className="text-muted-foreground max-w-xl">
            Feedback from people I’ve worked with on commission-based and
            real-world projects. (Demo Content)
          </p>
        </div>

        {/* 3D Marquee */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative mx-auto h-125 max-w-225 overflow-hidden [perspective-near]">
            <div
              className="flex gap-4"
              style={{
                transform:
                  "translateX(-80px) translateZ(-100px) rotateX(18deg) rotateY(-10deg) rotateZ(12deg)",
              }}
            >
              <Marquee pauseOnHover vertical className="[--duration:22s]">
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>

              <Marquee
                reverse
                pauseOnHover
                vertical
                className="[--duration:26s]"
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>

              <Marquee pauseOnHover vertical className="[--duration:24s]">
                {thirdRow.map((review) => (
                  <ReviewCard key={`${review.username}-3`} {...review} />
                ))}
              </Marquee>

              <Marquee
                reverse
                pauseOnHover
                vertical
                className="[--duration:28s]"
              >
                {fourthRow.map((review) => (
                  <ReviewCard key={`${review.username}-4`} {...review} />
                ))}
              </Marquee>
            </div>

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
