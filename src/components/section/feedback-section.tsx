"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HelpCircle, MessageCircleHeart, Sparkles, Star } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { feedbackSchema } from "@/lib/validators/feedback";
import { z } from "zod";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { fireSideCannons } from "@/lib/confetti-side-cannons";
import { Badge } from "../ui/badge";

type Feedback = {
  _id: string;
  name?: string;
  username?: string;
  message: string;
  rating?: number;
};

const ReviewCard = ({ name, username, message, rating }: Feedback) => {
  const displayName = name || "Anonymous";
  const displayUsername = username || "@anonymous";

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
          alt={displayName}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1">
          <figcaption className="text-sm font-medium line-clamp-1">{displayName}</figcaption>
          <p className="text-xs text-muted-foreground line-clamp-1">{displayUsername}</p>
        </div>

        <Badge variant="outline" className="flex items-center gap-1">
          <Star className="size-3" />
          <span>{rating}</span>
        </Badge>
      </div>

      <blockquote className="mt-2 text-sm">{message}</blockquote>
    </figure>
  );
};

const DialogForm = ({
  onOptimisticAdd,
}: {
  onOptimisticAdd: (feedback: Feedback) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      username: "",
      message: "",
      accessCode: "",
      rating: 0,
      isAnonymous: false,
    },
    mode: "onChange",
  });

  const isAnonymous = form.watch("isAnonymous");
  const rating = form.watch("rating");
  const messageLength = form.watch("message").length;

  const onSubmit = async (values: z.infer<typeof feedbackSchema>) => {
    try {
      setIsSubmitting(true);

      // Create optimistic feedback
      const optimisticFeedback: Feedback = {
        _id: `temp-${Date.now()}`,
        name: values.isAnonymous ? undefined : values.name,
        username: values.isAnonymous ? undefined : values.username,
        message: values.message,
        rating: values.rating,
      };

      // Add optimistically
      onOptimisticAdd(optimisticFeedback);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!res.ok) {
        toast.error("Invalid access code or submission failed");
        return;
      }

      toast.success("Thank you for your feedback 💙");
      fireSideCannons();
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RainbowButton>
          Rate Me <Sparkles className="size-4" />
        </RainbowButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <div className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Your Feedback Matters</DialogTitle>
            <DialogDescription>
              Only clients with an access code can leave feedback ⭐
            </DialogDescription>
          </DialogHeader>

          {/* Anonymous Toggle */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("name", "");
                            form.setValue("username", "");
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="mt-0!">Anonymous</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Name / Username with animation */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isAnonymous
                  ? "max-h-0 opacity-0 hidden"
                  : "max-h-50 opacity-100",
              )}
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isAnonymous}
                          placeholder="Allen Labrague"
                        />
                      </FormControl>
                      <FormMessage className="text-muted-foreground text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isAnonymous}
                          placeholder="@allenlabrague"
                        />
                      </FormControl>
                      <FormMessage className="text-muted-foreground text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Access Code */}
            <FormField
              control={form.control}
              name="accessCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Code</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="icon" variant="outline" type="button">
                          <HelpCircle className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="text-sm space-y-3 max-w-xs">
                        <div>
                          <p className="font-medium">Why is this required?</p>
                          <p className="text-muted-foreground text-xs">
                            To protect the feedback form from anonymous spam or
                            troll users.
                          </p>
                        </div>

                        <div>
                          <p className="font-medium">What is an access code?</p>
                          <p className="text-muted-foreground text-xs">
                            A code provided by the owner that allows clients to
                            submit feedback.
                          </p>
                        </div>

                        <div>
                          <p className="font-medium">
                            Do I need to use my real information?
                          </p>
                          <p className="text-muted-foreground text-xs">
                            No. You can stay anonymous or use a nickname if you
                            prefer.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage className="text-muted-foreground text-xs" />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Share your experience..."
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage className="text-muted-foreground text-xs" />
                    <p className="text-xs text-muted-foreground">
                      {messageLength}/1000 characters
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => field.onChange(star)}
                          className={cn(
                            "cursor-pointer transition-all hover:scale-110",
                            star <= field.value &&
                              "text-yellow-500 fill-yellow-500",
                          )}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-muted-foreground text-xs" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReviewCardSkeleton = () => (
  <div className="h-full w-64 rounded-xl border p-4 bg-muted/30">
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>

    <div className="mt-3 space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  </div>
);

export function FeedbackSection() {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/feedback`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleOptimisticAdd = (feedback: Feedback) => {
    setReviews((prev) => [feedback, ...prev]);
  };

  const mid = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, mid);
  const secondRow = reviews.slice(mid);

  return (
    <section id="feedback">
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Feedback
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              What clients say
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              See what clients think about working with me and the results we
              achieved together.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover>
              {Array.from({ length: 6 }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </Marquee>

            <Marquee reverse pauseOnHover>
              {Array.from({ length: 6 }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </Marquee>
          </div>
        ) : reviews.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircleHeart />
              </EmptyMedia>
              <EmptyTitle>No Feedback</EmptyTitle>
              <EmptyDescription>
                You&apos;re all caught up. New feedback will appear here. Be the
                first to leave feedback using the button below!
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <DialogForm onOptimisticAdd={handleOptimisticAdd} />
            </EmptyContent>
          </Empty>
        ) : (
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
        )}

        <div className="flex items-center justify-center gap-2">
          {reviews.length !== 0 && (
            <div className="flex justify-center">
              <DialogForm onOptimisticAdd={handleOptimisticAdd} />
            </div>
          )}

          <Button
            variant="link"
            className="text-sm"
            onClick={() =>
              toast.info("Feedback still in progress🫶!", {
                description:
                  "The full feedback page is coming soon. Stay tuned!, Check the roadmap for updates.🥰",
              })
            }
          >
            View feedback
          </Button>
        </div>
      </div>
    </section>
  );
}
