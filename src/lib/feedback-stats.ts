export async function getFeedbackStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/feedback`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { averageRating: 0, total: 0 };
  }

  const data = await res.json();
  return data.stats;
}
