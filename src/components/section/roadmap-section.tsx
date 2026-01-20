"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ROADMAP, RoadmapStatus } from "@/data/roadmap";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const statusConfig = {
  done: {
    label: "Done",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  planning: {
    label: "Planning",
    className: "bg-muted text-muted-foreground border-border",
  },
} as const;

const FILTERS: Array<"all" | RoadmapStatus> = [
  "all",
  "done",
  "in-progress",
  "planning",
];

export default function RoadmapSection() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("all");

  const filtered = ROADMAP.filter((item) =>
    filter === "all" ? true : item.status === filter,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 mt-2">
        {FILTERS.map((f) => (
          <Badge
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className="cursor-pointer select-none capitalize"
          >
            {f === "all" ? "All" : statusConfig[f].label}
          </Badge>
        ))}
      </div>

      <div className="relative space-y-8">
        <Accordion type="single" collapsible className="space-y-4">
          {filtered.map((item) => (
            <div key={item.version} className="relative">
              <AccordionItem
                value={item.version}
                className="rounded-xl border bg-background px-5"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <h4 className="font-semibold leading-none">
                        {item.version} — {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <Badge
                      className={cn(
                        "border shrink-0",
                        statusConfig[item.status].className,
                      )}
                    >
                      {statusConfig[item.status].label}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-5">
                  <Separator className="mb-4" />
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 size-1 rounded-full bg-foreground/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        More updates coming soon — stay tuned 🚀
      </p>
    </div>
  );
}
