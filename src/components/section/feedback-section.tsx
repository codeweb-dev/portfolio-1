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
import { Switch } from "../ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { feedbackSchema } from "@/lib/validators/feedback";

type Feedback = {
  _id: string;
  name?: string;
  username?: string;
  message: string;
};

const ReviewCard = ({ name, username, message }: Feedback) => {
  const displayName = name || "Anonymous";
  const displayUsername = username || "@client";

  return (
    <figure
      className={cn(
        "relative h-full w-64 overflow-hidden rounded-xl border p-4",
        "bg-muted/50 hover:bg-muted transition",
      )}
    >
      <div className="flex items-center gap-2">
        <img
          src={`https://avatar.vercel.sh/${displayName}`}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <figcaption className="text-sm font-medium">{displayName}</figcaption>
          <p className="text-xs text-muted-foreground">{displayUsername}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{message}</blockquote>
    </figure>
  );
};

const DialogForm = () => {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      message: "",
      accessCode: "",
      rating: 0,
      isAnonymous: false,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = feedbackSchema.safeParse({
          ...value,
          rating,
        });

        if (!result.success) {
          toast.error("Invalid form data");
          return { form: "Invalid form data" };
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...value, rating }),
        });

        if (!res.ok) {
          toast.error("Invalid access code or submission failed");
          return;
        }

        toast.success("Thank you for your feedback 💙");
        form.reset();
        setRating(0);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <RainbowButton>
          Rate Me <Sparkles className="size-4" />
        </RainbowButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-6"
        >
          <DialogHeader>
            <DialogTitle>Your Feedback Matters</DialogTitle>
            <DialogDescription>
              Only clients with an access code can leave feedback ⭐
            </DialogDescription>
          </DialogHeader>

          {/* Anonymous */}
          <form.Field name="isAnonymous">
            {(field) => (
              <div className="flex items-center gap-2">
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label>Anonymous</Label>
              </div>
            )}
          </form.Field>

          {/* Name / Username */}
          {!form.state.values.isAnonymous && (
            <div className="flex gap-4">
              <form.Field name="name">
                {(field) => (
                  <div className="grid gap-1 flex-1">
                    <Label>Name</Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="username">
                {(field) => (
                  <div className="grid gap-1 flex-1">
                    <Label>Username</Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          )}

          {/* Access Code */}
          <form.Field name="accessCode">
            {(field) => (
              <div className="grid gap-1">
                <Label>Access Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="outline">
                        <BadgeQuestionMark className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="text-sm">
                      Use the code provided by the owner 🔑
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </form.Field>

          {/* Message */}
          <form.Field name="message">
            {(field) => (
              <div className="grid gap-1">
                <Label>Message</Label>
                <Textarea
                  rows={4}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={cn(
                  "cursor-pointer",
                  star <= rating && "text-yellow-500",
                )}
              />
            ))}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={
                isSubmitting || rating === 0 || !!form.state.errors.length
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export function FeedbackSection() {
  const [reviews, setReviews] = useState<Feedback[]>([]);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then(setReviews)
      .catch(console.error);
  }, []);

  const mid = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, mid);
  const secondRow = reviews.slice(mid);

  return (
    <section id="feedback">
      <div className="flex flex-col gap-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">What clients say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real feedback from real clients.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Marquee pauseOnHover>
            {firstRow.map((review) => (
              <ReviewCard key={review._id} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover>
            {secondRow.map((review) => (
              <ReviewCard key={review._id} {...review} />
            ))}
          </Marquee>
        </div>

        <div className="flex justify-center">
          <DialogForm />
        </div>
      </div>
    </section>
  );
}
