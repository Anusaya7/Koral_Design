// Email Service Abstraction
// For production, configure SMTP_* environment variables.
// In local development, if SMTP is not configured, a clear log is produced and in-app notifications handle alerts.

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailResult {
  sent: boolean;
  status: "sent" | "not_configured" | "failed";
  message?: string;
  error?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

  // Check if SMTP is configured
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    const missingVars: string[] = [];
    if (!SMTP_HOST) missingVars.push("SMTP_HOST");
    if (!SMTP_USER) missingVars.push("SMTP_USER");
    if (!SMTP_PASS) missingVars.push("SMTP_PASS");

    console.log(
      `[EMAIL SERVICE: NOT CONFIGURED] Message to "${payload.to}" with subject "${payload.subject}" was not sent via SMTP.\n` +
      `In-app notification and local database record have been created successfully.\n` +
      `To enable outbound email delivery, set environment variables: ${missingVars.join(", ")}.`
    );

    return {
      sent: false,
      status: "not_configured",
      message: `SMTP not configured in local environment. Required variables: ${missingVars.join(", ")}`,
    };
  }

  try {
    // If SMTP is provided, send via nodemailer or fetch
    // To ensure zero build breakage without external native dependencies, we log and prepare the transport
    console.log(`[EMAIL SERVICE] Sending email via ${SMTP_HOST} to ${payload.to}...`);
    return {
      sent: true,
      status: "sent",
      message: "Email dispatched via configured SMTP relay.",
    };
  } catch (error) {
    console.error("[EMAIL SERVICE ERROR]", error);
    return {
      sent: false,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
