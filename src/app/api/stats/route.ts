import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PageStat from "@/models/PageStat";

export async function POST(req: Request) {
  const { slug, action } = await req.json();
  await dbConnect();

  let update = {};

  switch (action) {
    case "view":
      update = { $inc: { views: 1 } };
      break;
    case "heart":
      update = { $inc: { hearts: 1 } };
      break;
    case "unheart":
      update = { $inc: { hearts: -1 } };
      break;
    // case "rate":
    //   update = { $inc: { ratings: 1 } };
    //   break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const stat = await PageStat.findOneAndUpdate(
    { slug, hearts: { $gt: 0 } }, // prevent negative
    update,
    { upsert: true, new: true },
  );

  return NextResponse.json(stat);
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
