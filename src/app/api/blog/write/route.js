import { authOptions } from "@/utils/auth";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const dynamic = "force-dynamic";

// POST BLOG POST
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, desc, tags, img } = body;

    if (!title || !desc) {
      return NextResponse.json(
        { message: "Title and description are required." },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      return NextResponse.json(
        { message: "Post with this title already exists." },
        { status: 400 }
      );
    }

    let cloudinaryUrls = [];
    if (img && Array.isArray(img)) {
      if (img.length > 35) {
        return NextResponse.json(
          { message: "You can upload a maximum of 5 images." },
          { status: 400 }
        );
      }

      // Upload images to Cloudinary with size transformation
      for (const image of img) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "posts",
        });
        cloudinaryUrls.push(uploadRes.secure_url);
      }
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        tags,
        img: cloudinaryUrls.length ? cloudinaryUrls : img,
        slug,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Create Post Error:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
