import { NextResponse } from "next/server";
import db, { logActivity } from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();

    const allowedStatuses = ["NEW", "REVIEWING", "SHORTLISTED", "INTERVIEW", "REJECTED", "HIRED"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    db.prepare(`
      UPDATE career_applications
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, id);

    logActivity("Admin", "UPDATE_STATUS", "CareerApplication", id, `Changed application status to ${status}`);

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Application PATCH error:", error);
    return NextResponse.json({ error: "Failed to update application status" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    db.prepare("DELETE FROM career_applications WHERE id = ?").run(id);

    logActivity("Admin", "DELETE", "CareerApplication", id, "Deleted career application");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
