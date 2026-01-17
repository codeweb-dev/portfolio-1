"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeQuestionMark, Sparkles, Star } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "../ui/switch";

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
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/10 bg-gray-950/10 hover:bg-gray-950/15",
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
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
};

const RatingSheet = () => {
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false); // State to track the anonymous switch

  const handleClick = (rate: number) => {
    setRating(rate);
  };

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked); // Update state based on the switch's checked value
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <RainbowButton>
            Rate Me <Sparkles className="text-sm" />
          </RainbowButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Your Feedback Matters</DialogTitle>
            <DialogDescription>
              I value every bit of feedback from my clients 💬. Whether it’s a
              review or a suggestion, your input helps me grow and refine my
              work 🌱. Please take a moment to share your experience, and don’t
              forget to rate it ⭐️!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={handleAnonymousChange}
            />
            <Label htmlFor="anonymous">Anonymous</Label>
          </div>

          <div className="grid gap-6">
            {isAnonymous ? (
              <p className="text-sm text-muted-foreground">
                You can leave any name or username, or leave it blank for
                anonymity.
              </p>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" placeholder="Allen Labrague" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="@allen.dev"
                  />
                </div>
              </div>
            )}

            <div className="grid gap-3">
              <Label htmlFor="code-1">Access Code</Label>
              <div className="flex items-center justify-center gap-3">
                <Input
                  id="code-1"
                  name="code"
                  type="password"
                  placeholder="Enter your access code"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="w-10">
                      <BadgeQuestionMark className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <p className="text-sm">
                      🔑 Use the unique code you received to share your
                      feedback, exclusive to you! ✨
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="message-1">Your Thoughts Matter to Me</Label>
              <Textarea
                id="message-1"
                name="message"
                placeholder="I’d love to hear your feedback..."
                rows={5}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="rating-1">Rate My Work</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => handleClick(star)}
                    className={`cursor-pointer ${
                      star <= rating ? "text-yellow-500" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export function FeedbackSection() {
  return (
    <section id="feedback">
      <div className="flex flex-col gap-y-10">
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

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>

        <div className="flex justify-center">
          <RatingSheet />
        </div>
      </div>
    </section>
  );
}
