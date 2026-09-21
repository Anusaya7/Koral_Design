import { NextResponse } from "next/server";
import db from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const logs = db.prepare(`
      SELECT * FROM activity_logs
      ORDER BY id DESC
      LIMIT ?
    `).all(limit);

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Activity GET error:", error);
    return NextResponse.json({ error: "Failed to fetch activity logs" }, { status: 500 });
  }
}
