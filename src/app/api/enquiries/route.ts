import { NextResponse } from "next/server";
import db, { createNotification, logActivity } from "@/lib/db";
import { isAuthorizedAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function GET() {
  const authorized = await isAuthorizedAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = db.prepare("SELECT * FROM enquiries ORDER BY id DESC").all();
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Enquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, company, project_type, subject, message } = data;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const cleanName = name.trim().slice(0, 120);
    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    const cleanPhone = (phone || "").toString().trim().slice(0, 40);
    const cleanCompany = (company || "").toString().trim().slice(0, 150);
    const cleanProjectType = (project_type || subject || "General Architectural Consultation").toString().trim().slice(0, 150);
    const cleanSubject = (subject || cleanProjectType).toString().trim().slice(0, 200);
    const cleanMessage = message.trim().slice(0, 3000);

    // Rate Limiting / Duplicate check (prevent submissions identical within 15 seconds)
    const recentDuplicate = db.prepare(`
      SELECT id FROM enquiries
      WHERE email = ? AND message = ?
      AND datetime(created_at, '+15 seconds') >= datetime('now')
    `).get(cleanEmail, cleanMessage);

    if (recentDuplicate) {
      return NextResponse.json(
        { error: "Duplicate submission detected. Please wait a moment before sending again." },
        { status: 429 }
      );
    }

    // Insert Enquiry
    const stmt = db.prepare(`
      INSERT INTO enquiries (name, email, phone, company, project_type, subject, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'NEW')
    `);

    const result = stmt.run(
      cleanName,
      cleanEmail,
      cleanPhone,
      cleanCompany,
      cleanProjectType,
      cleanSubject,
      cleanMessage
    );

    const enquiryId = Number(result.lastInsertRowid);

    // Create In-App Notification
    createNotification(
      "ENQUIRY",
      "New Business Enquiry",
      `${cleanName} (${cleanCompany || "Individual"}) — ${cleanProjectType}`,
      {
        enquiryId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        project_type: cleanProjectType,
        subject: cleanSubject,
      }
    );

    // Audit Log
    logActivity(
      "Public Visitor",
      "SUBMIT_ENQUIRY",
      "Enquiry",
      enquiryId,
      `${cleanName} submitted enquiry for ${cleanProjectType}`
    );

    // Attempt Outbound Email (logs if not configured)
    await sendEmail({
      to: "projects@koralsdesign.com",
      subject: `[New Website Inquiry] ${cleanProjectType} — ${cleanName}`,
      text: `New project enquiry received:\n\nName: ${cleanName}\nCompany: ${cleanCompany}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nProject Type: ${cleanProjectType}\nMessage:\n${cleanMessage}`,
    });

    return NextResponse.json({
      success: true,
      message: "Your project consultation enquiry has been received. Our engineering team will review and respond promptly.",
      id: enquiryId,
    });
  } catch (error) {
    console.error("Enquiry POST error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry. Please try again." }, { status: 500 });
  }
}
