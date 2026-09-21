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
    const applications = db.prepare(`
      SELECT ca.*, c.title as job_title, c.location as job_location
      FROM career_applications ca
      LEFT JOIN careers c ON ca.career_id = c.id
      ORDER BY ca.id DESC
    `).all();
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Applications GET error:", error);
    return NextResponse.json({ error: "Failed to fetch career applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const applicantName = data.applicant_name || data.name;
    const applicantEmail = data.email || data.applicant_email;
    const applicantPhone = data.phone || data.applicant_phone;
    const applicantPosition = data.position || data.job_title || "Architectural / Engineering Opportunity";
    const portfolioUrl = data.portfolio_url || data.portfolio;
    const coverNote = data.cover_note || data.message;
    const careerId = data.career_id ? parseInt(data.career_id.toString(), 10) : null;

    // Validation
    if (!applicantName || typeof applicantName !== "string" || applicantName.trim().length === 0) {
      return NextResponse.json({ error: "Applicant name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicantEmail || !emailRegex.test(applicantEmail)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!applicantPhone || typeof applicantPhone !== "string" || applicantPhone.trim().length < 7) {
      return NextResponse.json({ error: "A valid contact phone number is required." }, { status: 400 });
    }

    const cleanName = applicantName.trim().slice(0, 120);
    const cleanPosition = applicantPosition.toString().trim().slice(0, 150);
    const cleanEmail = applicantEmail.trim().toLowerCase().slice(0, 120);
    const cleanPhone = applicantPhone.trim().slice(0, 40);
    const cleanPortfolio = (portfolioUrl || "").toString().trim().slice(0, 500);
    const cleanCover = (coverNote || "").toString().trim().slice(0, 3000);

    // Prevent duplicate rapid application (within 30s)
    const duplicate = db.prepare(`
      SELECT id FROM career_applications
      WHERE email = ? AND position = ?
      AND datetime(created_at, '+30 seconds') >= datetime('now')
    `).get(cleanEmail, cleanPosition);

    if (duplicate) {
      return NextResponse.json(
        { error: "Application already submitted recently. Please wait." },
        { status: 429 }
      );
    }

    const stmt = db.prepare(`
      INSERT INTO career_applications (
        career_id, position, applicant_name, email, phone, portfolio_url, cover_note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'NEW')
    `);

    const result = stmt.run(
      careerId,
      cleanPosition,
      cleanName,
      cleanEmail,
      cleanPhone,
      cleanPortfolio,
      cleanCover
    );

    const applicationId = Number(result.lastInsertRowid);

    // Create In-App Notification
    createNotification(
      "CAREER",
      "New Career Application",
      `${cleanName} applied for ${cleanPosition}`,
      {
        applicationId,
        applicant_name: cleanName,
        position: cleanPosition,
        email: cleanEmail,
        phone: cleanPhone,
        portfolio_url: cleanPortfolio,
      }
    );

    // Audit Log
    logActivity(
      "Applicant",
      "SUBMIT_APPLICATION",
      "CareerApplication",
      applicationId,
      `${cleanName} applied for ${cleanPosition}`
    );

    // Attempt Outbound Email
    await sendEmail({
      to: "careers@koralsdesign.com",
      subject: `[New Career Application] ${cleanPosition} — ${cleanName}`,
      text: `New career application received:\n\nPosition: ${cleanPosition}\nApplicant: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nPortfolio/Resume: ${cleanPortfolio}\n\nCover Note:\n${cleanCover}`,
    });

    return NextResponse.json({
      success: true,
      message: "Your application has been received by Korals Design HR. We will review your profile and reach out.",
      id: applicationId,
    });
  } catch (error) {
    console.error("Application POST error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
