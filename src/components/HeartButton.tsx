"use client";

import { Heart } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export default function HeartButton({
  slug,
  initialHearts,
}: {
  slug: string;
  initialHearts: number;
}) {
  const [hearted, setHearted] = useState(false);
  const [count, setCount] = useState(initialHearts);

  useEffect(() => {
    const saved = localStorage.getItem(`hearted-${slug}`);
    if (saved === "true") setHearted(true);
  }, [slug]);

  async function toggleHeart() {
    const action = hearted ? "unheart" : "heart";

    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action }),
    });

    const data = await res.json();
    setCount(data.hearts);
    setHearted(!hearted);
    localStorage.setItem(`hearted-${slug}`, String(!hearted));
  }

  return (
    <button onClick={toggleHeart} className="flex items-center gap-1">
      <Heart
        className={`size-4 ${hearted ? "fill-red-500 text-red-500" : ""}`}
      />
      {count}
    </button>
  );
}
