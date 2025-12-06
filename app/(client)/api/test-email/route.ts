import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  console.log("🧪 Test email endpoint called");
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_API_KEY value:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");

  try {
    console.log("📧 Attempting to send test email...");
    
    const result = await resend.emails.send({
      from: "Shop Matrix <onboarding@resend.dev>",
      to: ["shopcartt@gmail.com"], // Replace with your actual email
      subject: "Test Email from Shop Matrix",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #3ab8a3;">Test Email</h1>
          <p>This is a test email from Shop Matrix to verify Resend is working correctly.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
          <p>If you received this, your Resend integration is working! ✅</p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log("Resend response:", JSON.stringify(result, null, 2));

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      result,
    });
  } catch (error) {
    console.error("❌ Test email failed:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
      { status: 500 }
    );
  }
}
