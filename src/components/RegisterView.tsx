"use client";

import { useEffect } from "react";

export default function RegisterView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        action: "view",
      }),
      credentials: "include",
    });
  }, [slug]);

  return null;
}
