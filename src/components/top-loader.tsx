"use client";

import NextTopLoader from "nextjs-toploader";

export function TopLoader() {
  return (
    <NextTopLoader
      color="#6b7280"
      height={2}
      showSpinner={false}
      speed={300}
      easing="ease-out"
      shadow="0 0 8px rgba(0,0,0,0.35)"
      zIndex={99999}
    />
  );
}
