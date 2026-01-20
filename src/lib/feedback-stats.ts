export async function getFeedbackStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/feedback`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return { averageRating: 0, total: 0 };
    }
    const data = await res.json();
    return data.stats;
  } catch (error) {
    console.log("Failed to fetch feedback stats:", error);
    return { averageRating: 0, total: 0 };
  }
}