"use client";

import confetti from "canvas-confetti";

export function fireSideCannons() {
  // ♿ Respect reduced motion
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 50,
      startVelocity: 45,
      origin: { x: 0, y: 0.55 },
      colors,
      zIndex: 9999,
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 50,
      startVelocity: 45,
      origin: { x: 1, y: 0.55 },
      colors,
      zIndex: 9999,
    });

    requestAnimationFrame(frame);
  };

  frame();
}
