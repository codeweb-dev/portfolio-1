"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function HeartButton({
  slug,
  initialHearts,
}: {
  slug: string;
  initialHearts: number;
}) {
  const storageKey = `hearted_${slug}`;

  const [hearted, setHearted] = useState(false);
  const [count, setCount] = useState(initialHearts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(storageKey) === "true") {
      setHearted(true);
    }
  }, [storageKey]);

  async function toggleHeart() {
    if (hearted || loading) return;
    setLoading(true);

    setHearted(true);
    setCount((c) => c + 1);
    localStorage.setItem(storageKey, "true");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action: "heart" }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCount(data.hearts);
    } catch {
      setHearted(false);
      setCount((c) => c - 1);
      localStorage.removeItem(storageKey);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleHeart}
      disabled={hearted || loading}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground gap-2",
        hearted ? "pointer-events-none opacity-50" : "",
      )}
    >
      <Heart
        className={`size-4 transition ${
          hearted ? "fill-red-500 text-red-500" : ""
        }`}
      />
      {count}
    </button>
  );
}
