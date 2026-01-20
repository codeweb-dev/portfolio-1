import dbConnect from "@/lib/mongodb";
import PageStat from "@/models/PageStat";

export interface Stats {
  views: number;
  hearts: number;
}

export async function getStats(slug: string): Promise<Stats> {
  try {
    await dbConnect();
    const stat = await PageStat.findOne({ slug }).lean();
    return stat
      ? { views: stat.views, hearts: stat.hearts }
      : { views: 0, hearts: 0 };
  } catch (error) {
    console.log("Failed to fetch stats (likely during build):", error);
    return { views: 0, hearts: 0 };
  }
}