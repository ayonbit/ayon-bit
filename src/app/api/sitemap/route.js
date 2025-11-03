// src/app/api/sitemap/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ make sure this file exists
// or adjust path based on your setup

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me";

async function generateSitemap() {
  const posts = await prisma.post.findMany({
    select: { slug: true, createdAt: true },
  });

  const staticPages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.7 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
    { url: "/service", changefreq: "monthly", priority: 0.7 },
    { url: "/portfolio", changefreq: "monthly", priority: 0.7 },
  ];

  const blogPages = posts.map((post) => {
    const postDate = new Date(post.createdAt);
    const ageInMonths =
      (Date.now() - postDate.getTime()) / (30 * 24 * 60 * 60 * 1000);

    let changefreq =
      ageInMonths < 1 ? "weekly" : ageInMonths < 6 ? "monthly" : "yearly";

    const priority = Math.max(0.5, 1 - ageInMonths * 0.1);

    return {
      url: `/blog/${post.slug}`,
      changefreq,
      priority: priority.toFixed(1),
      lastmod: post.createdAt,
    };
  });

  const pages = [...staticPages, ...blogPages];

  const xmlContent = pages
    .map(
      (page) => `
      <url>
        <loc>${BASE_URL.replace(/\/$/, "")}${page.url}</loc>
        <lastmod>${
          page.lastmod
            ? new Date(page.lastmod).toISOString()
            : new Date().toISOString()
        }</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlContent}
    </urlset>`;
}

export async function GET() {
  try {
    const sitemap = await generateSitemap();

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(" Failed to generate sitemap:", error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
