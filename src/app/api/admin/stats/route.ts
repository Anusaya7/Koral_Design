import { NextResponse } from "next/server";
import db from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET() {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalEnquiries = (db.prepare("SELECT COUNT(*) as c FROM enquiries").get() as { c: number }).c;
    const unreadEnquiries = (db.prepare("SELECT COUNT(*) as c FROM enquiries WHERE status = 'NEW'").get() as { c: number }).c;

    const totalApplications = (db.prepare("SELECT COUNT(*) as c FROM career_applications").get() as { c: number }).c;
    const unreadApplications = (db.prepare("SELECT COUNT(*) as c FROM career_applications WHERE status = 'NEW'").get() as { c: number }).c;

    const publishedProjects = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE is_published = 1").get() as { c: number }).c;
    const draftProjects = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE is_published = 0").get() as { c: number }).c;

    const publishedServices = (db.prepare("SELECT COUNT(*) as c FROM services WHERE is_published = 1").get() as { c: number }).c;
    const draftServices = (db.prepare("SELECT COUNT(*) as c FROM services WHERE is_published = 0").get() as { c: number }).c;

    const openJobs = (db.prepare("SELECT COUNT(*) as c FROM careers WHERE is_published = 1").get() as { c: number }).c;
    const unreadNotifications = (db.prepare("SELECT COUNT(*) as c FROM notifications WHERE is_read = 0").get() as { c: number }).c;

    const recentEnquiries = db.prepare(`
      SELECT id, name, email, phone, company, project_type, subject, status, created_at
      FROM enquiries
      ORDER BY id DESC
      LIMIT 5
    `).all();

    const recentApplications = db.prepare(`
      SELECT id, position, applicant_name, email, phone, status, created_at
      FROM career_applications
      ORDER BY id DESC
      LIMIT 5
    `).all();

    const recentActivity = db.prepare(`
      SELECT id, admin_user, action, entity_type, details, created_at
      FROM activity_logs
      ORDER BY id DESC
      LIMIT 8
    `).all();

    return NextResponse.json({
      totalEnquiries,
      unreadEnquiries,
      totalApplications,
      unreadApplications,
      publishedProjects,
      draftProjects,
      publishedServices,
      draftServices,
      openJobs,
      unreadNotifications,
      recentEnquiries,
      recentApplications,
      recentActivity,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
