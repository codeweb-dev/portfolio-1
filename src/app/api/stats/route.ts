import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PageStat from "@/models/PageStat";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { slug, action } = await req.json();
  await dbConnect();

  const cookieStore = await cookies();

  /* 👀 VIEW (unchanged) */
  if (action === "view") {
    const viewed = cookieStore.get(`viewed_${slug}`);
    if (viewed) return NextResponse.json({ skipped: true });

    const stat = await PageStat.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { upsert: true, new: true },
    );

    cookieStore.set(`viewed_${slug}`, "true", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ views: stat.views });
  }

  /* ❤️ HEART */
  if (action === "heart") {
    const hearted = cookieStore.get(`hearted_${slug}`);
    if (hearted) {
      const stat = await PageStat.findOne({ slug });
      return NextResponse.json({ hearts: stat?.hearts ?? 0, skipped: true });
    }

    const stat = await PageStat.findOneAndUpdate(
      { slug },
      { $inc: { hearts: 1 } },
      { upsert: true, new: true },
    );

    cookieStore.set(`hearted_${slug}`, "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return NextResponse.json({ hearts: stat.hearts });
  }

  /* 💔 UNHEART (optional – usually disabled) */
  if (action === "unheart") {
    const hearted = cookieStore.get(`hearted_${slug}`);
    if (!hearted) {
      const stat = await PageStat.findOne({ slug });
      return NextResponse.json({ hearts: stat?.hearts ?? 0, skipped: true });
    }

    const stat = await PageStat.findOneAndUpdate(
      { slug },
      { $inc: { hearts: -1 } },
      { new: true },
    );

    cookieStore.delete(`hearted_${slug}`);

    return NextResponse.json({ hearts: Math.max(stat?.hearts ?? 0, 0) });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  await dbConnect();

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const stat = await PageStat.findOne({ slug });

  //   return NextResponse.json(stat ?? { views: 0, hearts: 0, ratings: 0 });
  return NextResponse.json(stat ?? { views: 0, hearts: 0 });
}
