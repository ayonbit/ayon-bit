import prisma from "@/lib/server";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// GET /api/comments?slug=the-post-slug
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug in query" },
      { status: 400 }
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postSlug: slug },

      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return NextResponse.json(
      { error: "Failed to load comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments
export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { desc, postSlug } = await req.json();

  if (!desc?.trim() || !postSlug) {
    return NextResponse.json(
      { error: "Missing desc or postSlug in body" },
      { status: 400 }
    );
  }

  const data = { desc, postSlug };
  if (session?.user?.email) data.userEmail = session.user.email;

  try {
    const comment = await prisma.comment.create({ data });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}
