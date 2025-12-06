import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Important for Nodemailer

// Create transporter once (reused across requests)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    console.log("📧 /api/send-test-email called");

    const { subject, message } = await req.json();

    const mailOptions = {
      from: `"Shop Matrix" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
      subject: subject || "Test email from Shop Matrix",
      html:
        message ||
        `
        <h2>Shop Matrix Test Email</h2>
        <p>If you see this, your Next.js email setup works ✅</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
