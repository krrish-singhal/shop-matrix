import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: "Shop Matrix <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Shop Matrix Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e2768 0%, #3ab8a3 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Shop Matrix</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">Your Tech. Your Way.</p>
          </div>
          <div style="padding: 40px 30px; background: #f5f5f5;">
            <h2 style="color: #1e2768; text-align: center;">Welcome to the Family! 🎉</h2>
            <p style="color: #333; line-height: 1.6;">
              Thank you for subscribing to our newsletter! You're now part of our exclusive community 
              that gets first access to:
            </p>
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
              <ul style="color: #333; line-height: 2; padding-left: 20px;">
                <li>🔥 <strong>Exclusive Deals</strong> - Special discounts just for subscribers</li>
                <li>🆕 <strong>New Arrivals</strong> - Be the first to know about new products</li>
                <li>💡 <strong>Tech Tips</strong> - Expert advice and product guides</li>
                <li>🎁 <strong>Special Offers</strong> - Birthday rewards and seasonal sales</li>
              </ul>
            </div>
            <p style="color: #333; line-height: 1.6;">
              As a welcome gift, use code <strong style="color: #3ab8a3; background: #e8f5f3; padding: 3px 8px; border-radius: 4px;">WELCOME10</strong> 
              for 10% off your next order!
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://shopmatrix.com/shop" 
                 style="background: #3ab8a3; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Start Shopping
              </a>
            </div>
          </div>
          <div style="background: #1e2768; padding: 20px; text-align: center;">
            <p style="color: #3ab8a3; margin: 0 0 10px 0;">Follow us on social media</p>
            <p style="margin: 0;">
              <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">Facebook</a>
              <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">Twitter</a>
              <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">Instagram</a>
            </p>
            <p style="color: #666; margin: 20px 0 0 0; font-size: 12px;">
              © 2025 Shop Matrix. All rights reserved.<br>
              <a href="https://shopmatrix.com/unsubscribe" style="color: #888;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    // Notify admin about new subscriber
    await resend.emails.send({
      from: "Shop Matrix <noreply@shopmatrix.com>",
      to: ["marketing@shopmatrix.com"],
      subject: "New Newsletter Subscriber",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter!" 
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
