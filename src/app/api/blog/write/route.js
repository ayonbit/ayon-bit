import { authOptions } from "@/utils/auth";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

// POST BLOG POST
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, desc, tags, img } = body;

    const slug = slugify(title, { lower: true, strict: true });

    // Handle base64 image if it's a single image
    let cloudinaryUrls = [];
    if (img && Array.isArray(img)) {
      for (const image of img) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "posts",
        });
        cloudinaryUrls.push(uploadRes.secure_url);
      }
    }

    // Create post
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
