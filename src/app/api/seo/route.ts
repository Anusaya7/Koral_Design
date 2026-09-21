import { NextResponse } from "next/server";
import db, { logActivity } from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageKey = searchParams.get("page");

    if (pageKey) {
      const entry = db.prepare("SELECT * FROM seo_settings WHERE page_key = ?").get(pageKey);
      if (!entry) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
      return NextResponse.json(entry);
    }

    const allEntries = db.prepare("SELECT * FROM seo_settings ORDER BY page_key ASC").all();
    return NextResponse.json(allEntries);
  } catch (error) {
    console.error("SEO GET error:", error);
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { page_key, title, description, og_title, og_description, og_image, canonical_url } = data;

    if (!page_key || !title || !description) {
      return NextResponse.json({ error: "page_key, title, and description are required." }, { status: 400 });
    }

    db.prepare(`
      INSERT OR REPLACE INTO seo_settings (page_key, title, description, og_title, og_description, og_image, canonical_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      page_key,
      title,
      description,
      og_title || title,
      og_description || description,
      og_image || "/images/hero_villa_render.jpg",
      canonical_url || `https://www.koralsdesign.com/${page_key === "home" ? "" : page_key}`
    );

    logActivity("Admin", "UPDATE_SEO", "SEO", page_key, `Updated SEO metadata for page: ${page_key}`);

    return NextResponse.json({ success: true, page_key });
  } catch (error) {
    console.error("SEO POST error:", error);
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 });
  }
}
