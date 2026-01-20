import dbConnect from "@/lib/mongodb";
import PageStat from "@/models/PageStat";

export interface Stats {
  views: number;
  hearts: number;
}

export async function getStats(slug: string): Promise<Stats> {
  await dbConnect();

  const stat = await PageStat.findOne({ slug }).lean();

  return stat
    ? { views: stat.views, hearts: stat.hearts }
    : { views: 0, hearts: 0 };
}
