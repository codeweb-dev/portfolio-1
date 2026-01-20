/* eslint-disable @next/next/no-img-element */
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackSection } from "@/components/section/feedback-section";
import ProjectsSection from "@/components/section/projects-section";
import ContactSection from "@/components/section/contact-section";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { SpinningText } from "@/components/ui/spinning-text";
import { getFeedbackStats } from "@/lib/feedback-stats";
import { ArrowUpRight, Eye, Star } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import RegisterView from "@/components/RegisterView";
import HeartButton from "@/components/HeartButton";
import { Badge } from "@/components/ui/badge";
import { getStats } from "@/lib/stats";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RoadmapSection from "@/components/section/roadmap-section";

const BLUR_FADE_DELAY = 0.04;
export const revalidate = 60;

export default async function Page() {
  const stats = await getStats("home");
  const feedbackStats = await getFeedbackStats();

  return (
    <>
      <RegisterView slug="home" />

      <main className="min-h-dvh flex flex-col gap-14 relative">
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
              <div className="gap-2 flex flex-col order-2 md:order-1">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      <Eye className="size-3.5 mr-2" />
                      {stats.views.toLocaleString()} Profile Views
                    </Badge>

                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {feedbackStats.averageRating}
                      </span>
                      <span className="text-muted-foreground">
                        ({feedbackStats.total})
                      </span>
                    </Badge>

                    <HeartButton slug="home" initialHearts={stats.hearts} />
                  </div>
                </BlurFade>
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name}`}
                />
                <BlurFadeText
                  className="text-muted-foreground max-w-150 md:text-lg lg:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mt-3">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61581024022869"
                      target="_blank"
                    >
                      <InteractiveHoverButton>
                        Let’s Work Together
                      </InteractiveHoverButton>
                    </Link>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link">View updates & roadmap</Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Updates & Roadmap</DialogTitle>
                          <DialogDescription>
                            A transparent look at what’s live, what’s coming,
                            and what’s being planned.
                          </DialogDescription>
                        </DialogHeader>

                        <RoadmapSection />
                      </DialogContent>
                    </Dialog>
                  </div>
                </BlurFade>
              </div>
              <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
                <div className="relative flex items-center justify-center">
                  <SpinningText className="absolute top-11 md:top-14 text-base md:text-xl">
                    learn more • earn more • grow more •
                  </SpinningText>

                  <Avatar className="relative z-10 size-22 md:size-28 rounded-full">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </BlurFade>
          </div>
        </section>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill, id) => (
                <BlurFade
                  key={skill.name}
                  delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                >
                  <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                    {skill.icon && (
                      <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                    )}
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            <div className="flex flex-col gap-8">
              {DATA.education.map((education, index) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + index * 0.05}
                >
                  <Link
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group"
                  >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {education.logoUrl ? (
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                        />
                      ) : (
                        <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="projects">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <ProjectsSection />
          </BlurFade>
        </section>
        <section id="feedback">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <FeedbackSection />
          </BlurFade>
        </section>
        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <ContactSection />
          </BlurFade>
        </section>
      </main>
    </>
  );
}
