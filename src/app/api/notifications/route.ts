import { NextResponse } from "next/server";
import db, { logActivity } from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const unreadRow = db.prepare("SELECT COUNT(*) as count FROM notifications WHERE is_read = 0").get() as { count: number };
    const totalRow = db.prepare("SELECT COUNT(*) as count FROM notifications").get() as { count: number };

    let query = "SELECT * FROM notifications";
    if (unreadOnly) {
      query += " WHERE is_read = 0";
    }
    query += " ORDER BY id DESC LIMIT ?";

    const notifications = db.prepare(query).all(limit);

    return NextResponse.json({
      unreadCount: unreadRow.count,
      totalCount: totalRow.count,
      notifications,
    });
  } catch (error) {
    console.error("Notifications GET error:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, markAll, all } = body;

    if (markAll || all) {
      db.prepare("UPDATE notifications SET is_read = 1 WHERE is_read = 0").run();
      logActivity("Admin", "MARK_READ_ALL", "Notification", undefined, "Marked all notifications as read");
      return NextResponse.json({ success: true, message: "All notifications marked as read." });
    }

    if (id) {
      db.prepare("UPDATE notifications SET is_read = 1 WHERE id = ?").run(id);
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ error: "Missing id or markAll parameter" }, { status: 400 });
  } catch (error) {
    console.error("Notifications PATCH error:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  return PATCH(req);
}

export async function DELETE(req: Request) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    if (clearAll) {
      db.prepare("DELETE FROM notifications").run();
      logActivity("Admin", "CLEAR_ALL", "Notification", undefined, "Cleared all notifications");
      return NextResponse.json({ success: true, message: "Cleared all notifications." });
    }

    if (id) {
      db.prepare("DELETE FROM notifications WHERE id = ?").run(id);
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ error: "Missing id or clearAll parameter" }, { status: 400 });
  } catch (error) {
    console.error("Notifications DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}
