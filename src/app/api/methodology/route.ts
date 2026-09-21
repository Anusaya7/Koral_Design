import { NextResponse } from "next/server";
import db, { logActivity } from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    let query = "SELECT * FROM methodology_stages";
    if (!all) {
      query += " WHERE is_active = 1";
    }
    query += " ORDER BY display_order ASC, id ASC";

    const stages = db.prepare(query).all();
    return NextResponse.json(stages);
  } catch (error) {
    console.error("Methodology GET error:", error);
    return NextResponse.json({ error: "Failed to fetch methodology stages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const {
      id,
      stage_number,
      stage_code,
      title,
      subtitle,
      description,
      image,
      display_order,
      is_active,
    } = data;

    if (!title || !subtitle || !description) {
      return NextResponse.json({ error: "Title, subtitle, and description are required." }, { status: 400 });
    }

    if (id) {
      // Update existing stage
      db.prepare(`
        UPDATE methodology_stages
        SET stage_number = ?, stage_code = ?, title = ?, subtitle = ?,
            description = ?, image = ?, display_order = ?, is_active = ?
        WHERE id = ?
      `).run(
        stage_number || "01",
        stage_code || title.toUpperCase(),
        title,
        subtitle,
        description,
        image || "/images/hero_villa_render.jpg",
        display_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id
      );

      logActivity("Admin", "UPDATE", "MethodologyStage", id, `Updated stage: ${title}`);
      return NextResponse.json({ success: true, id });
    } else {
      // Insert new stage
      const result = db.prepare(`
        INSERT INTO methodology_stages (stage_number, stage_code, title, subtitle, description, image, display_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        stage_number || "01",
        stage_code || title.toUpperCase(),
        title,
        subtitle,
        description,
        image || "/images/hero_villa_render.jpg",
        display_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1
      );

      const newId = Number(result.lastInsertRowid);
      logActivity("Admin", "CREATE", "MethodologyStage", newId, `Created stage: ${title}`);
      return NextResponse.json({ success: true, id: newId });
    }
  } catch (error) {
    console.error("Methodology POST error:", error);
    return NextResponse.json({ error: "Failed to save methodology stage" }, { status: 500 });
  }
}
