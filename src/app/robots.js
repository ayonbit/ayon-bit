const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/sitemap"],
        disallow: [
          "/admin/",
          "/write/",
          "/sign-in/",
          "/dashboard/",
          "/favicon.ico",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/api/sitemap`,
    host: baseUrl,
  };
}
