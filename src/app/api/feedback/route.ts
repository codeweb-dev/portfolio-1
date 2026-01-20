import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { feedbackSchema } from "@/lib/validators/feedback";
import { rateLimit } from "@/lib/rateLimit";

const limiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    // 1️⃣ Identify client
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // 2️⃣ Rate limit FIRST
    const isAllowed = limiter.check(ip, 3);
    if (!isAllowed) {
      return NextResponse.json(
        { error: "Too many feedback submissions. Try again later." },
        { status: 429 },
      );
    }

    // 3️⃣ Parse body
    const body = await req.json();

    // 4️⃣ Validate payload
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, username, message, rating, accessCode, isAnonymous } =
      parsed.data;

    // 5️⃣ Access code validation
    if (accessCode !== process.env.FEEDBACK_ACCESS_CODE) {
      return NextResponse.json(
        { error: "Invalid access code" },
        { status: 401 },
      );
    }

    // 6️⃣ Save feedback
    await dbConnect();

    await Feedback.create({
      name: isAnonymous ? undefined : name,
      username: isAnonymous ? undefined : username,
      message,
      rating,
      isAnonymous,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /feedback error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const feedbacks = await Feedback.find().lean();

    const total = feedbacks.length;

    const averageRating =
      total === 0
        ? 0
        : (
            feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / total
          ).toFixed(1);

    return NextResponse.json({
      feedbacks,
      stats: {
        total,
        averageRating: Number(averageRating),
      },
    });
  } catch (error) {
    console.error("GET /feedback error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 },
    );
  }
}

